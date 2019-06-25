import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import Modal from "react-bootstrap/Modal";
import ProfExportSpecificStudentSubjectGrades from "../Exports/ProfExportSpecificStudentSubjectGrades.jsx";

import 'react-table/react-table.css'

import getCsrfToken from "../../functions/csrf.js";

class ProfSearchStudentsSubjectGrades extends React.Component {
    constructor(){
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
                    })
                })
                this.setState({ prof_subjects });
            })
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubjectChange() {
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

    }

    getSpecificStudentGrades(student_row_info) {

    }

    render () {

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
                Header: gettext('Student Email'),
                accessor: 'email',
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Actions'),
                Cell: props => {
                    return (
                        <Button variant="link"
                            onClick={() => { this.getSpecificStudentGrades(props.original); }}
                        >{gettext('+ Evaluation Details')}</Button>
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
                Header: gettext('Evaluation'),
                accessor: 'designation',
                style: {
                    textAlign: 'right',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: gettext('Grade'),
                accessor: 'grade',
                style: {
                    textAlign: 'center',
                }
            },
            {
                Header: gettext('Percentage'),
                accessor: 'percentage',
                style: {
                    textAlign: 'right',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            }
        ];

        return(
            <div class="resto-pagina">
            <Container>

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
                            //data={this.state.studentAttendances}
                            //resolveData={data => data.map(row => row)}
                            columns={columnsModal}
                            defaultPageSize={5}
                        >
                            {/*
                                this.state.studentAttendances.length > 0 ?
                                    (state, filtredData, instace) => {
                                        this.reactTable = state.pageRows.map(result => { return result._original });
                                        return (
                                            <div>
                                                {filtredData()}
                                                <ProfExportSpecificStudentAttendances studentAttendances={this.reactTable} subject={this.state.subjects[this.state.chosenSubject - 1].designation} student={this.reactTable[0].student} />
                                            </div>
                                        );
                                    } : null*/
                            }

                        </ReactTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>


                <Container>
                    <h2 className="title_main_menu">{gettext("Consult Student Grades")}</h2>
                    <hr />
                    <h2>ola</h2>

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Subjects">
                                <Form.Label>{gettext("Subjects")}</Form.Label>
                                <Form.Control
                                    id="Subjects"
                                    name="subject"
                                    as="select"
                                    onChange={this.handleSubjectChange}
                                >
                                    {this.state.prof_subjects.map(subject =>
                                        <option value={subject.id}>{subject.designation}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
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

                        <Button
                            variant="primary"
                            className="btn btn-primary search_students_attendances"
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
                        //data={this.state.results}
                        //resolveData={data => data.map(row => row)}
                        columns={columns}
                        defaultPageSize={5}
                        filterable
                    />
                </Container>

            </Container>
            </div>
        )
    }
}

export default ProfSearchStudentsSubjectGrades;
