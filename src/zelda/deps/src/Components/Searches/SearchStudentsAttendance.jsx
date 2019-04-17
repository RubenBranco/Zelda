import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import ProfExportAllSubjectAttendances from "../Exports/ProfExportAllSubjectAttendances.jsx";
import ProfExportSpecificStudentAttendances from "../Exports/ProfExportSpecificStudentAttendances.jsx";
import ReactTable from "react-table";
import { urlParamEncode } from "../../functions/url.js";

import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'

import getCsrfToken from "../../functions/csrf.js";


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
            chosenClass: null,
            results: [],
            startDate: new Date(),
            error: null,
            modalShow: false,
            studentAttendances: [],
            chosenStudent: null,
        };
        this.csrfmiddlewaretoken = getCsrfToken();

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
        this.getSpecificStudentAttendance = this.getSpecificStudentAttendance.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (this.state.userid === null) {
            fetch('/api/professor/describe_self', {
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
            });
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
                    "X-CSRFToken": this.csrfmiddlewaretoken,
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

    handleSearchRequest(event) {
        let payload = {};
        const paramKeys = {
            'firstName': 'first_name',
            'lastName': 'last_name',
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

        fetch(`/api/attendances/summary/?${urlParamEncode(payload)}`, {
            method: 'GET',
            headers:{
                "X-CSRFToken": this.csrfmiddlewaretoken,
            }
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    results: data
                });
                var resultsId = [...this.state.results];
                resultsId.forEach((result, index) => {
                    result.tableEntryId = index + 1;
                })
                this.setState({results: resultsId});
            });
        });
    }

    handleClose() {
        this.setState({ modalShow: false });
    }

    handleShow() {
        this.setState({ modalShow: true });
    }

    getSpecificStudentAttendance(rowProps) {
        fetch(`/api/attendances?student_number=${rowProps.student_number}`, {
            method: 'GET',
            headers:{
                "X-CSRFToken": this.csrfmiddlewaretoken,
            }
        }).then(response => {
            response.json().then(data => {
                data.forEach((studentAttendance, index) => {
                    studentAttendance.tableEntryId = index + 1;
                })
                this.setState({ studentAttendances: data })
                this.handleShow();
            });
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
            Header: gettext('Student Number'),
            accessor: 'student_number',
            filterable: true,
            style: {
                textAlign: 'right',
            },
            width: 200,
            maxWidth: 200,
            minWidth: 200,
            },
            {
            Header: gettext('Student Name'),
            accessor: 'name',
            filterable: true,
            style: {
                textAlign: 'right',
            }
            },
            {
            Header: gettext('Total Attendances'),
            accessor: 'attendances',
            filterable: true,
            style: {
                textAlign: 'right',
            },
            width: 200,
            maxWidth: 200,
            minWidth: 200,
            },
            {
            Header: gettext('Student Email'),
            accessor: 'email',
            sortable: false,
            filterable: false,
            style: {
                textAlign: 'right',
            }
            },
            {
            Cell: props =>{
                return (
                    <Button variant="link"
                    onClick={() => {this.getSpecificStudentAttendance(props.original);}}
                    >{gettext('+ More Details')}</Button>
                )
            },
            sortable: false,
            filterable: false,
            style: {
                textAlign: 'right',
            }
            }
        ];

        const columnsModal = [
            {
            Header: '#',
            accessor: 'tableEntryId',
            style: {
                textAlign: 'right',
            },
            width: 100,
            maxWidth: 100,
            minWidth: 100,
            },
            {
            Header: gettext('Class Type'),
            accessor: 'lesson_type',
            style: {
                textAlign: 'center',
            }
            },
            {
            Header: gettext('Date'),
            accessor: 'date',
            style: {
                textAlign: 'right',
            },
            width: 110,
            maxWidth: 110,
            minWidth: 110,
            }
        ];

        return(
            <div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.modalShow}
                    onHide={this.handleClose}
                >
                    <Modal.Body>
                        <ReactTable
                            noDataText={gettext('No Results Found')}
                            keyField='#'
                            data={this.state.studentAttendances}
                            resolveData={data => data.map(row => row)}
                            columns={columnsModal}
                            defaultPageSize={5}
                        >
                        {
                            this.state.studentAttendances.length > 0 ?
                            (state, filtredData, instace) => {
                                this.reactTable = state.pageRows.map(result => {return result._original });
                            return (
                                <div>
                                    {filtredData()}
                                    <ProfExportSpecificStudentAttendances studentAttendances={this.reactTable} subject={this.state.subjects[this.state.chosenSubject - 1].designation} student={this.reactTable[0].student}/>
                                </div>
                                );
                            } : null
                        }

                        </ReactTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

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
                    >

                    {
                        this.state.results.length > 0 ?
                        (state, filtredData, instace) => {
                        this.reactTable = state.pageRows.map(result => {return result._original });
                        return (
                            <div>
                                {filtredData()}
                                <ProfExportAllSubjectAttendances results={this.reactTable}  />
                            </div>
                            );
                        } : null
                    }

                    </ReactTable>
                </Container>
            </div>
        )
    }
}

export default SearchStudentsAttendance;
