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
            shiftLessStudentsData: [],
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
        console.log(1);
        console.log(this.state);
        console.log(2);
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
                let counter = 0;
                data.map(subjectList => {
                    subjects.push(
                        {
                            id: subjectList[counter].subject,
                            designation: subjectList.map(subject =>
                                    subject.designation
                                ).join(" / "),
                            href: "",
                        }
                    )
                    counter++;
                });
                this.setState({
                    courses: subjects,
                });
                this.getShiftlessStudentsData();
            });
        });
    }

    getShiftlessStudentsData() {
        let shiftLessStudentsData = [];
        let counter2 = 0;
        this.state.courses.map(subject => {
            fetch(`/api/subject/${subject.id}/shiftless_students/`, {
                method: 'GET',
                headers:{
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    shiftLessStudentsData.push({
                        entryTableId: counter2,
                        first_name: data[0].first_name,
                        last_name: data[0].last_name,
                        institutional_email: data[0].institutional_email,
                        shiftless: data[0].shiftless,
                    })
                })
            })
            counter2++;
        });
        this.setState({ shiftLessStudentsData });
        console.log(this.state);
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
                            {this.state.shiftLessStudentsData.map(shiftLessStudentsData =>
                                <option>{shiftLessStudentsData.first_name}</option>
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