import React from 'react';
import Schedule from "./Schedule.jsx";
import Container from "react-bootstrap/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";




import getCsrfToken from "../../functions/csrf.js"

class SubjectSchedule extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: [],
            userid: null,
            subjects: [],
            chosenSubject: null,
        };
        this.csrfmiddlewaretoken = getCsrfToken();

        this.handleChosenSubjectChange = this.handleChosenSubjectChange.bind(this);
    }

    componentDidMount() {
        if (!this.state.userid) {
            fetch('/api/appuser/describe_self/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    if (data.user_type == "Professor") this.getProfessor();
                    else this.getStudent();
                })
            })
        }
        if (!this.state.classes.length) {
            this.getClasses();
        }
    }

    getClasses() {
        fetch('/api/timetable_lesson_spec/my_timetable/', {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                data.map(aula => {
                    if (this.state.chosenSubject === null) {
                        this.setState(prevState => ({
                            classes: [...prevState.classes, aula]
                        }))
                    } else if (this.state.chosenSubject === aula.subject_designation) {
                        console.log(1);
                        this.setState({ classes: [aula] })
                    } else {
                        this.setState({ classes: [] })
                    }
                })
            })
        })
    }

    handleChosenSubjectChange(chosenSubject) {
        this.setState({ chosenSubject })
        this.getClasses();
        console.log(this.state.classes);
    }

    getStudentSubjects() {
        fetch(`/api/student/${this.state.userid}/course_subjects/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let subjects = [];
                data.map(subjectInfo =>
                    this.populateSubjects(subjects, subjectInfo)
                );
                this.setState({
                    subjects: subjects,
                    chosenSubject: subjects[0],
                });
            });
        });
    }

    populateSubjects(subjectList, subjectInfo) {
        let subject = {};
        subject.id = subjectInfo.subject;
        subject.designation = subjectInfo.designation;
        subjectList.push(subject);
    }

    getStudent() {
        fetch('/api/student/describe_self/', {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userid: data.id,
                });
                this.getStudentSubjects();
            });
        });
    }

    getProfessor() {
        fetch('/api/professor/describe_self/', {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userid: data.id,
                });
                this.getProfessorSubjects();
            });
        });
    }

    getProfessorSubjects() {
        fetch(`/api/professor/${this.state.userid}/course_subjects/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
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
                            href: `/subjects/${subjectList[0].subject}`,
                        }
                    )
                });
                this.setState({ subjects });
            });
        });
    }

    render() {

        return (
            <div>

                <Container className="schedule">
                    <Tab.Container id="list-group-tabs-example" >
                        <Row>
                            <Col sm={3}>
                                <ListGroup className="schedule_subjects">
                                    {this.state.subjects.map(subject =>
                                        <ListGroup.Item action variant="light" onClick={() => this.handleChosenSubjectChange(subject.designation)}>
                                            {subject.designation}
                                        </ListGroup.Item>
                                    )}

                                </ListGroup>
                            </Col>
                            <Col>
                                {!this.state.classes.length ? null :
                                    <Schedule classes={this.state.classes} />
                                }
                            </Col>
                        </Row>
                    </Tab.Container>

                </Container>
            </div>
        );
    }
}

export default SubjectSchedule;