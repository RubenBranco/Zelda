import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SubjectList from "./MenuLists/SubjectList.jsx";

class GetProfessorSubjects extends React.Component{
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
            fetch('/api/professor/describe_self/', {
                method: 'GET',
                headers:{
                    "X-CSRFToken": csrfmiddlewaretoken,
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
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        fetch(`/api/professor/${this.state.userid}/course_subjects/`, {
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


    render () {
        return (
            <div>
                {this.props.display == 'select' ? 
                <Form.Row>
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
                </Form.Row>
                
                : 
                <SubjectList courses={this.state.courses}/>
                }
            </div>
        );
    }
}

export default GetProfessorSubjects;