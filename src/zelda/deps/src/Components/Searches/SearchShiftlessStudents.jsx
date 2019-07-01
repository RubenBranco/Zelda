import React from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import ProfExportAllShiftLessStudentSubject from "../Exports/ProfExportAllShiftLessStudentsSubject.jsx";

import 'react-table/react-table.css'

import getCsrfToken from "../../functions/csrf.js";

class SearchShiftlessStudents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            chosenSubject: null,
            subjects: [],
            shiftlessStudentsData: [],
        };

        this.csrfmiddlewaretoken = getCsrfToken();
        this.hasFetched = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.getShiftlessStudentsData = this.getShiftlessStudentsData.bind(this);
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
                    subjects: subjects,
                    chosenSubject: subjects[0].id,
                });
                this.getShiftlessStudentsData();
            });
        });
    }

    getShiftlessStudentsData() {
        this.state.subjects.map(subject => {
            fetch(`/api/subject/${subject.id}/shiftless_students/`, {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let shiftlessStudentsData = [];
                    data.map((student, index) => {
                        shiftlessStudentsData.push({
                            first_name: student.first_name,
                            last_name: student.last_name,
                            name: student.first_name + " " + student.last_name,
                            student_number: student.number,
                            institutional_email: student.institutional_email,
                            shiftless: student.shiftless,
                        })
                    });
                    this.setState({ shiftlessStudentsData });
                })
            })
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

    render() {

        const columns = [
            {
                Header: gettext('Student Number'),
                accessor: 'student_number',
                filterable: true,
                sortable: true,
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
                sortable: true,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Student Email'),
                accessor: 'institutional_email',
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'right',
                }
            },
            {
                Header: gettext('Information'),
                Cell: props => {
                    return (
                        <OverlayTrigger
                            trigger="click"
                            placement="left"
                            overlay={
                                <Popover title={gettext("Missing:")}>
                                    <ListGroup variant="flush">
                                        {props.original.shiftless['Teórica'] !== undefined || props.original.shiftless['Theory'] !== undefined ?
                                            <ListGroup.Item>{gettext('Theory')}</ListGroup.Item>
                                            : null
                                        }
                                        {props.original.shiftless['Practice'] !== undefined || props.original.shiftless['Teórico-Prática'] !== undefined ?
                                            <ListGroup.Item>{gettext('Practice')}</ListGroup.Item>
                                            : null
                                        }
                                        {props.original.shiftless['Laboratory'] !== undefined || props.original.shiftless['Laboratório'] !== undefined ?
                                            <ListGroup.Item>{gettext('Laboratory')}</ListGroup.Item>
                                            : null
                                        }
                                        {props.original.shiftless['Field'] !== undefined || props.original.shiftless['Aula de campo'] !== undefined ?
                                            <ListGroup.Item>{gettext('Field')}</ListGroup.Item>
                                            : null
                                        }
                                    </ListGroup>
                                </Popover>
                            }
                        >
                            <Button variant="link">
                                {gettext('+ Info')}
                            </Button>
                        </OverlayTrigger>
                    )
                },
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'right',
                }
            },
        ];

        return (
            <div>                <h2 className="title_main_menu">{gettext("Shiftless Students")}</h2>

                <Container>
                    <hr />
                    <Form >
                        <Form.Group as={Col}>
                            <Form.Label>{gettext("Subject")}</Form.Label>
                            <Form.Control
                                id="Subject"
                                name="Subject"
                                as="select"
                                onChange={this.handleSubjectChange}
                            >
                                {this.state.subjects.map(subject =>
                                    <option>{subject.designation}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="btn btn-primary search_students_attendances"
                            onClick={this.getShiftlessStudentsData}
                        >
                            {gettext("Search ")}
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>

                    <br />

                    <ReactTable
                        noDataText={gettext('No Results Found')}
                        data={this.state.shiftlessStudentsData}
                        resolveData={data => data.map(row => row)}
                        columns={columns}
                        defaultPageSize={5}
                        filterable
                    >
                        {
                            this.state.shiftlessStudentsData.length > 0 ?
                                (state, filtredData, instace) => {
                                    this.reactTable = state.pageRows.map(result => { return result._original });
                                    return (
                                        <div>
                                            {filtredData()}
                                            <ProfExportAllShiftLessStudentSubject results={this.reactTable} subject={this.state.subjects[this.state.chosenSubject - 1].designation} />
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

export default SearchShiftlessStudents;
