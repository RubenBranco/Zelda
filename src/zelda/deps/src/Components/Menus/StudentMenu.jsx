import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CoursesList from "../MenuLists/SubjectList.jsx";

import getCsrfToken from "../../functions/csrf.js";


class StudentMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        fetch('api/student/describe_self', {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userid: data.id,
                });
                fetch(`api/student/${this.state.userid}/subjects`, {
                    method: 'GET',
                    headers: {
                        "X-CSRFToken": this.csrfmiddlewaretoken,
                    },
                }).then(response => {
                    response.json().then(data => {
                        let subjects = [];
                        data.map(subject => {
                            subjects.push({
                                id: subject.id,
                                designation: subject.designation,
                                href: `/subjects/${subject.id}`,
                            })
                        });
                        this.setState({
                            courses: subjects,
                        });
                    });
                });
            });
        });
    }

    render() {
        return (
            <div>
                <CardDeck>
                    <CoursesList courses={this.state.courses} />
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                            {gettext("Consult")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    <a href={window.viewAttendancesUrl}>{gettext("Attendance")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href={window.viewCurriculumUrl}>{gettext("Curriculum")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href={window.viewGradesUrl}>{gettext("Grades")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action><a href={window.viewProfileUrl}>{gettext("Profile")}</a></ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href={window.viewTimetableUrl}>{gettext("Schedule")}</a>
                                </ListGroup.Item>
                            </ListGroup>


                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                            {gettext("Management")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">

                                <ListGroup.Item action>
                                    <a href={window.viewSubjectSignupUrl}>{gettext("Enroll / Unsubscribe in Curricular Units")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href={window.viewShiftManagementUrl}>{gettext("Enroll / Unsubscribe in Shifts")}</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default StudentMenu;
