import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileSearch from "../Searches/SearchProfile.jsx";
import CoursesList from "../MenuLists/CoursesList.jsx";


class StudentMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
    }

    componentDidMount() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        fetch('api/student/describe_self', {
            method: 'GET',
            headers: {
                "X-CSRFToken": csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userid: data.id,
                });
                fetch(`api/student/${this.state.userid}/subjects`, {
                    method: 'GET',
                    headers: {
                        "X-CSRFToken": csrfmiddlewaretoken,
                    },
                }).then(response => {
                    response.json().then(data => {
                        let subjects = [];
                        data.map(subject => {
                            subjects.push({
                                id: subject.id,
                                designation: subject.designation,
                                href: "",
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
                <CoursesList courses={this.state.courses} />
                <CardDeck>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Consult")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    {gettext("Attendance")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Curriculum")}
                                </ListGroup.Item>
                                <ListGroup.Item action>{gettext("Profile")}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Schedule")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    {gettext("Personal")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("By Subjects")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Enroll / Unsubscribe in Curricular Units")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Enroll / Unsubscribe in Shifts")}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </CardDeck>
                <ProfileSearch />
            </div>
        );
    }
}

export default StudentMenu;