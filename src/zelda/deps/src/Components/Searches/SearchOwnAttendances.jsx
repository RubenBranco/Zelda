import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from 'react-datepicker';
import ReactTable from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { urlParamEncode } from "../../functions/url.js";

import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'



class SearchOwnAttendances extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            subjects: [],
            chosenSubject: null,
            classes: {},
            chosenClass: null,
            results: [],
            startDate: new Date(),
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
    }

    componentDidMount() {
        if (this.state.userid === null) {
            let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
            fetch('/api/student/describe_self', {
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
        fetch(`/api/student/${this.state.userid}/course_subjects/`, {
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
        subject.id = subjectInfo.subject;
        subject.designation = subjectInfo.designation;
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

    handleSearchRequest(event) {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        let payload = {};
        const paramKeys = {
            'startDate': 'start_date',
            'chosenSubject': 'subject',
            'chosenClass': 'shift',
        }

        for (var key in paramKeys) {
            if (this.state[key] !== null) {
                if (key === 'startDate') {
                    payload[paramKeys[key]] = this.state.startDate.toISOString().split("T")[0];
                } else {
                    payload[paramKeys[key]] = this.state[key];
                }
            }
        }

        fetch(`/api/attendances/my_attendances/?${urlParamEncode(payload)}`, {
            method: 'GET',
            headers:{
                "X-CSRFToken": csrfmiddlewaretoken,
            }
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    results: data
                });
                let counter = 0;
                var resultsId = [...this.state.results];
                resultsId.forEach(function(result) {
                    counter++;
                    result.tableEntryId = counter;
                })
                this.setState({results: resultsId});
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

            const columns = [
                {
                    Header: '#',
                    accessor: 'tableEntryId',
                    filterable: true,
                    style: {
                        textAlign: 'right',
                    },
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100,
                },
                {
                    Header: gettext('Subject'),
                    accessor: 'subject_designation',
                    style: {
                        textAlign: 'right',
                    },
                },
                {
                    Header: gettext('Class Type'),
                    accessor: 'lesson_type',
                    style: {
                        textAlign: 'right',
                    },
                },
                {
                    Header: gettext('Date'),
                    accessor: 'date',
                    style: {
                        textAlign: 'right',
                    },
                }
            ];

        return (
            <div>
                <Container>
                    <h2>{gettext("Consult Attendances")}</h2>
                    <hr />

                    <Form>
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
                            onClick={this.handleSearchRequest}
                        >
                            {gettext("Search")}{" "}
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </Container>

                <Container>
                    <ReactTable
                        noDataText={gettext('No Results Found')}
                        keyField='#'
                        data={this.state.results}
                        resolveData={data => data.map(row => row)}
                        columns={columns}
                        defaultPageSize={5}
                        filterable
                    />
                </Container>
            </div>
        )
    }

}
export default SearchOwnAttendances;