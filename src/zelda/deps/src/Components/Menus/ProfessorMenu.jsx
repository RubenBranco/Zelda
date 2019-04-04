import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileSearch from "../Searches/SearchProfile.jsx";
import CoursesList from "../MenuLists/CoursesList.jsx";


class ProfessorMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
    }

    componentDidMount() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        if (this.state.userid === null) {
            fetch('api/professor/describe_self', {
                method: 'GET',
                headers:{
                    "X-CSRFToken": csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        userid: data.id,
                    });
                    this.getCourses();
                });
            })
        }
    }

    getCourses() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        fetch(`api/professor/${this.state.userid}/course_subjects/`, {
            method: 'GET',
            headers:{
                "X-CSRFToken": csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let subjects = [];
                data.map(subjectList => {
                    subjects.push(
                        {
                            id: subjectList[0].subject,
                            designation: subjectList.map(subject =>
                                    subject.designation
                                ).join(" / "),
                            href: "",
                        }
                    )
                });
                this.setState({
                    courses: subjects,
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
                                    <a href="#">{gettext("Attendance")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action><a href="#">{gettext("Profile")}</a></ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Requests")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    <a href="#">gettext("Room Change")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href="#">{gettext("Room Reservation")}</a>
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

export default ProfessorMenu;
