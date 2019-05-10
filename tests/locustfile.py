import random

from locust import HttpLocust, TaskSet, task
from lxml import html


TEST_HOST = "https://zelda-edu.me"
AUTH = dict(
    student=dict(
        email="fc1@alunos.ulisboa.pt",
        password="olaola",
    ),
    professor=dict(
        email="p1@ulisboa.pt",
        password="test12345",
    )
)

def get_csrfmiddleware_token(tree):
    return tree.cssselect("input[name='csrfmiddlewaretoken']")[0].value


def login(l, user_type):
    r = l.client.get("/login/")
    tree = html.fromstring(r.text)
    csrfmiddleware_token = get_csrfmiddleware_token(tree)
    json_data = AUTH.get(user_type)
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
           "Referer": f"{TEST_HOST}/login/"
        },
        cookies={
            "csrftoken": l.client.cookies.get('csrftoken'),
        },
    )


def logout(l):
    return l.client.get("/logout/")


class StudentTaskSet(TaskSet):
    def on_start(self):
        r = login(self, "student")

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


class StudentClient(HttpLocust):
    task_set = StudentTaskSet
    wait_function = lambda self: random.expovariate(1) * 5000
