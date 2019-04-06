import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


class SearchStudentsAttendance extends React.Component{
    constructor(){
        super();
        this.state = {
            userid: null,
            firstName: null,
            lastName: null,
            subjects: [],
            chosenSubject: null,
            classes: {},
            selectedSubject: null,
            results: [],
            startDate: new Date(),
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    componentDidMount() {
        if (this.state.userid === null) {
            let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
            fetch('/api/professor/describe_self', {
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
            });
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
                data.map(subjectInfo =>
                    this.populateSubjects(subjects, subjectInfo)
                );
                this.setState({
                    subjects: subjects,
                    chosenSubject: subjects[0].id,
                });
                this.getClasses();
            });
        });
    }

    populateSubjects(subjectList, subjectInfo) {
        let subject = {};
        subject.id = subjectInfo[0].subject;
        subject.designation = subjectInfo.map(subject =>
            subject.designation
        ).join(" / ");
        subjectList.push(subject);
    }

    getClasses() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        this.state.subjects.map(subject => {
            let classes = this.state.classes;
            let subjectId = subject.id;
            classes[subjectId] = [];
            this.setState({
                classes
            });
            fetch(`/api/subject/${subjectId}/shifts`, {
                method: 'GET',
                headers:{
                    "X-CSRFToken": csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState((prevState, _) => ({
                            classes: Object.assign(prevState.classes, {[subjectId]: prevState.classes[subjectId].concat(data)})
                    }));
                });
            });
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date,
        });
    }

    handleSubjectChange(event) {
        this.handleChange(event);
        this.setState({
            chosenSubject: event.target.value,
        });
    }

    render () {
        const classes = this.state.chosenSubject !== null && this.state.classes.hasOwnProperty(this.state.chosenSubject) ?
            this.state.classes[this.state.chosenSubject] : null;
        return(
            <div>
                <Container>
                    <h2>{gettext("Consult Students Attendances")}</h2>
                    <hr />

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label>{gettext("First Name")}</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder={gettext("First Name")} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label>{gettext("Last Name")}</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder={gettext("Last Name")} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Subjects">
                                <Form.Label>{gettext("Subjects")}</Form.Label>
                                <Form.Control
                                    name="subject"
                                    as="select"
                                    onChange={this.handleSubjectChange}
                                >
                                    {this.state.subjects.map(subject =>
                                        <option value={subject.id}>{subject.designation}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Class">
                                <Form.Label>{gettext("Class")}</Form.Label>
                                <Form.Control
                                    name="Class"
                                    as="select"
                                    onChange={this.handleChange}
                                    multiple
                                >
                                    {classes !== null ?
                                        classes.map(classObj =>
                                            <option value={classObj.id}>{classObj.code}</option>
                                        ) : null
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Date">
                                <Form.Label>{gettext("Start Date")}</Form.Label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button
                            variant="primary"
                            className="btn btn-primary"
                            type="submit"
                        >
                            {gettext("Search")}{" "}
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default SearchStudentsAttendance;
