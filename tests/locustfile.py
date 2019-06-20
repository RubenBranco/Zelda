import random
from multiprocessing import Queue
from xmlrpc.client import ServerProxy

from locust import HttpLocust, TaskSet, task
from lxml import html


TEST_HOST = "https://zelda-edu.me"
AUTH_SERVER = "http://localhost:9022"


def get_csrfmiddleware_token(tree):
    return tree.cssselect("input[name='csrfmiddlewaretoken']")[0].value


def login(l, creds):
    r = l.client.get("/login/")
    tree = html.fromstring(r.text)
    csrfmiddleware_token = get_csrfmiddleware_token(tree)
    json_data = creds
    json_data.update(dict(
        csrfmiddlewaretoken=csrfmiddleware_token,
    ))

    return l.client.post(
        "/login/",
        json=json_data,
        headers={
           "X-CSRFToken": csrfmiddleware_token,
           "Content-Type": "application/json",
           "Host": TEST_HOST.strip("https://"),
           "Origin": TEST_HOST,
           "Referer": f"{TEST_HOST}",
        },
        cookies={
            "csrftoken": l.client.cookies.get('csrftoken'),
        },
    )


def logout(l):
    return l.client.get("/logout/")


class StudentTaskSet(TaskSet):
    login_creds = dict()

    def setup(self):
        proxy = ServerProxy(AUTH_SERVER, allow_none=True)
        email, password = proxy.get_student_credentials()
        self.login_creds = dict(
            email=email,
            password=password,
        )
        print(f"Student received credentials {self.login_creds}")

    def on_start(self):
        if not self.login_creds:
            self.setup()
        print(f"Attempting student login with {self.login_creds}")
        login(self, self.login_creds)

    def on_stop(self):
        logout(self)

    @task
    def get_frontpage(self):
        self.client.get("/")

    @task
    def get_profile(self):
        self.client.get("/users/2")

    @task
    def get_grades(self):
        self.client.get("/student/grades")

    @task
    def get_attendances(self):
        self.client.get("/students/view_attendances")

    @task
    def get_course(self):
        self.client.get("/courses/1")

    @task
    def signup_or_change_shifts(self):
        s_mgmt = self.client.get("/student/subject_shift_management/1")
        s_mgmt_tree = html.fromstring(s_mgmt.text)
        csrfmiddlewaretoken = get_csrfmiddleware_token(s_mgmt_tree)

        shift_report = self.client.get(
            "/api/subject/1/shift_report",
            headers={
                "X-CSRFToken": csrfmiddlewaretoken,
            },
            cookies={
            "csrftoken": self.client.cookies.get('csrftoken'),
            },
        )
        data = shift_report.json()
        shifts = data["shifts"]

        for shift in shifts:
            if not shift["under_exchange_review"] \
                and shift["enrolled_students"] < shift["vacancies"]:
                if not shift["enrolled"] and not len(list(filter(lambda s: s["lesson_spec"][0]["c_type"] == shift["lesson_spec"][0]["c_type"] and s["enrolled"], shifts))):
                    self.client.get(
                        f"/api/shift/{shift['id']}/sign_up",
                        headers={
                            "X-CSRFToken": csrfmiddlewaretoken,
                        },
                        cookies={
                            "csrftoken": self.client.cookies.get('csrftoken'),
                        },
                    )
                else:
                    self.client.get(
                        f"/api/shift/{shift['id']}/request_exchange",
                        headers={
                            "X-CSRFToken": csrfmiddlewaretoken,
                        },
                        cookies={
                            "csrftoken": self.client.cookies.get('csrftoken'),
                        },
                    )


class ProfessorTaskSet(TaskSet):
    login_creds = dict()

    def setup(self):
        proxy = ServerProxy(AUTH_SERVER, allow_none=True)
        email, password = proxy.get_prof_credentials()
        self.login_creds = dict(
            email=email,
            password=password,
        )
        print(f"Professor received credentials {self.login_creds}")

    def on_start(self):
        if not self.login_creds:
            self.setup()
        print(f"Attempting professor login with {self.login_creds}")
        login(self, self.login_creds)

    def on_stop(self):
        logout(self)

    @task
    def get_frontpage(self):
        self.client.get("/")

    @task
    def get_profile(self):
        self.client.get("/users/2")

    @task
    def get_attendances(self):
        self.client.get("/professor/view_attendances")

    @task
    def get_subject(self):
        self.client.get("/subjects/2")

    @task
    def accept_shift_exchanges(self):
        req_mgmt = self.client.get("/professor/shift_management/requests")
        req_mgmt_tree = html.fromstring(req_mgmt.text)
        csrfmiddlewaretoken = get_csrfmiddleware_token(req_mgmt_tree)

        requests = self.client.get(
            "/api/shift_xg_requests/my_requests",
            headers={
                "X-CSRFToken": csrfmiddlewaretoken,
            },
            cookies={
                "csrftoken": self.client.cookies.get('csrftoken'),
            },
        )
        requests_data = requests.json()
        for request in requests_data:
            self.client.get(
                f"/api/shift_xg_requests/{request['id']}/modify/?acceptance=true",
                headers={
                "X-CSRFToken": csrfmiddlewaretoken,
                },
                cookies={
                    "csrftoken": self.client.cookies.get('csrftoken'),
                },
            )


class StudentClient(HttpLocust):
    task_set = StudentTaskSet
    wait_function = lambda self: random.expovariate(1) * 5000


class ProfessorClient(HttpLocust):
    task_set = ProfessorTaskSet
    wait_function = lambda self: random.expovariate(1) * 5000
