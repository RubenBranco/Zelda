import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SubjectList from "./MenuLists/SubjectList.jsx";

import getCsrfToken from "../functions/csrf.js";

class GetProfessorSubjects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        if (this.state.userid === null) {
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
                    this.getSubjects();
                });
            })
        }
    }

    getSubjects() {
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
                this.setState({
                    courses: subjects,
                });
            });
        });
    }

    render() {
        return (
            <div>
                {this.props.display == 'select' ?

                    <Form.Group as={Col} controlId="Subject">
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
                    :
                    <SubjectList courses={this.state.courses} />
                }
            </div>
        );
    }
}

export default GetProfessorSubjects;
