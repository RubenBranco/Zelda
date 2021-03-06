import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import ProfExportSpecificStudentSubjectGrades from "../Exports/ProfExportSpecificStudentSubjectGrades.jsx";

import 'react-table/react-table.css'

import getCsrfToken from "../../functions/csrf.js";

class ProfSearchStudentsSubjectGrades extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            prof_subjects: [],
            chosenSubject: null,
            search_results: [],
            student_first_name: null,
            student_last_name: null,
            modalShow: false,
        }

        this.csrfmiddlewaretoken = getCsrfToken();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                    this.getProfessorSubjects();
                });
            });
        }
    }

    getProfessorSubjects() {
        fetch(`/api/professor/${this.state.userid}/course_subjects/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let prof_subjects = [];
                data.map(subject => {
                    prof_subjects.push({
                        id: subject[0].id,
                        designation: subject[0].designation,
                    });
                });
                this.setState({
                    prof_subjects,
                    chosenSubject: prof_subjects[0].id,
                });
            });
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubjectChange(event) {
        this.handleChange(event);
        this.setState({
            chosenSubject: event.target.value,
        });
    }

    handleClose() {
        this.setState({ modalShow: false });
    }

    handleShow() {
        this.setState({ modalShow: true });
    }

    handleSearchRequest() {
        fetch(`/api/subject/${this.state.chosenSubject}/grades/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                data.map((gradesInfo, index) => {
                    let result = {}
                    fetch(`/api/appuser/${gradesInfo.student}/`, {
                        method: 'GET',
                        headers: {
                            "X-CSRFToken": this.csrfmiddlewaretoken,
                        },
                    }).then(response => {
                        response.json().then(data => {
                            result['subjectId'] = this.state.chosenSubject;
                            result['studentNumber'] = gradesInfo.student;
                            result['studentFirstName'] = data.first_name.toString();
                            result['studentLastName'] = data.last_name.toString();
                            result['studentInstitutionalEmail'] = data.institutional_email.toString();
                            result['evaluation'] = gradesInfo.designation.toString();
                            result['grade'] = gradesInfo.grade.toString();
                            result['observations'] = gradesInfo.observations;

                            this.setState(prevState => ({
                                search_results: [...prevState.search_results, result],
                            }));
                        });
                    });
                });
            });
        });
    }

    render() {


        const columns = [
            {
                Header: gettext('Evaluation'),
                accessor: 'evaluation',
                sortable: false,
                style: {
                    textAlign: 'center',
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
            },
            {
                Header: gettext('Grade'),
                accessor: 'grade',
                sortable: true,
                filterable: true,
                style: {
                    textAlign: 'center',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: gettext('Student First Name'),
                accessor: 'studentFirstName',
                filterable: true,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Student Last Name'),
                accessor: 'studentLastName',
                filterable: true,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Student Number'),
                accessor: 'studentNumber',
                sortable: true,
                filterable: true,
                style: {
                    textAlign: 'center',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: gettext('Student Email'),
                accessor: 'studentInstitutionalEmail',
                filterable: false,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Observations'),
                accessor: 'observations',
                sortable: false,
                filterable: false,
            },
        ];

        return (
            <div>
                <h2 className="title_main_menu">{gettext("Consult Student Grades")}</h2>

                <Container>
                    <Container>

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
                                        {this.state.prof_subjects.map(subject =>
                                            <option value={subject.id}>{subject.designation}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Button
                                variant="primary"
                                className="btn btn-primary search_students_attendances"
                                onClick={this.handleSearchRequest}
                            >
                                {gettext("Search Grades")}{" "}
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </Form>
                    </Container>

                    <Container>
                        <ReactTable
                            noDataText={gettext('No Results Found')}
                            data={this.state.search_results}
                            resolveData={data => data.map(row => row)}
                            columns={columns}
                            defaultPageSize={5}
                            filterable
                        >
                            {
                                this.state.search_results.length > 0 ?
                                    (state, filtredData, instace) => {
                                        this.reactTable = state.pageRows.map(result => { return result._original });
                                        return (
                                            <div>
                                                {filtredData()}
                                                <ProfExportSpecificStudentSubjectGrades results={this.reactTable} />
                                            </div>
                                        );
                                    } : null
                            }
                        </ReactTable>
                    </Container>
                </Container>
            </div>
        )
    }
}

export default ProfSearchStudentsSubjectGrades;
