import React from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import GetProfessorSubjects from "../GetProfessorSubjects.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";

import getCsrfToken from "../../functions/csrf.js";

class SearchShiftlessStudents extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
            shiftlessStudentsData: [],
        };

        this.csrfmiddlewaretoken = getCsrfToken();
        this.hasFetched = false;
    }

    componentDidMount() {
        if (this.state.userid === null) {
            fetch('/api/professor/describe_self/', {
                method: 'GET',
                headers:{
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        userid: data.id,
                    });
                    this.getSubjects();
                });
            })
        }
    }

    getSubjects() {
        fetch(`/api/professor/${this.state.userid}/course_subjects/`, {
            method: 'GET',
            headers:{
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let subjects = [];
                data.map((subjectList, index) => {
                    subjects.push(
                        {
                            id: subjectList[index].subject,
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
                this.getShiftlessStudentsData();
            });
        });
    }

    getShiftlessStudentsData() {
        this.state.courses.map(subject => {
            fetch(`/api/subject/${subject.id}/shiftless_students/`, {
                method: 'GET',
                headers:{
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let shiftlessStudentsData = [];
                    data.map((student, index) => {
                        shiftlessStudentsData.push({
                            entryTableId: index + 1,
                            first_name: student.first_name,
                            last_name: student.last_name,
                            institutional_email: student.institutional_email,
                            shiftless: student.shiftless,
                        })
                    });
                    this.setState({ shiftlessStudentsData });
                })
            })
        });
    }

    render () {
        return (
            <Container>
                 <Form>
                    <Form.Group as={Col}>
                        <Form.Label>{gettext("Subject")}</Form.Label>
                        <Form.Control
                            id="Subject"
                            name="Subject"
                            as="select"
                            >
                            {this.state.courses.map(course =>
                                <option>{course.designation}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>{gettext("Subject")}</Form.Label>
                        <Form.Control
                            id="Subject"
                            name="Subject"
                            as="select"
                            >
                            {this.state.shiftlessStudentsData.map(shiftlessStudentsData =>
                                <option>{shiftlessStudentsData.first_name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="btn btn-primary"
                        type="submit"
                    >
                    {gettext("Search")}
                    <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default SearchShiftlessStudents;
