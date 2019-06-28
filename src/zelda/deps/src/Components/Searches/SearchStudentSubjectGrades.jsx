import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ReactTable from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import 'react-table/react-table.css'

import getCsrfToken from "../../functions/csrf.js";

class SearchStudentSubjectGrades extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            student_number: null,
            chosenSubject: null,
            student_grades: [],
            student_subjects: [],
        }

        this.csrfmiddlewaretoken = getCsrfToken();

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.getStudentSubjectGradesData = this.getStudentSubjectGradesData.bind(this);
    }

    componentDidMount() {
        if (this.state.userid === null) {
            fetch('/api/student/describe_self/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        userid: data.id,
                        student_number: data.number,
                    });
                    this.getStudentSubjects();
                });
            });
        }
    }

    getStudentSubjects() {
        fetch(`/api/student/${this.state.userid}/subjects/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let student_subjects = [];
                data.map((subject, index) => {
                    student_subjects.push({
                        id: subject.id,
                        designation: subject.designation,
                    })
                })
                this.setState({ student_subjects });
                this.getStudentSubjectGradesData();
            })
        })
    }

    getStudentSubjectGradesData() {
        this.state.student_subjects.map(subject => {
            fetch(`/api/subject/${subject.id}/my_grades/`, {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let student_grades = [];
                    data.map(subject_grades => {
                        student_grades.push({
                            grade: subject_grades.grade,
                            designation: subject_grades.designation,
                            subject: subject_grades.subject,
                            percentage: subject_grades.percentage,
                        })
                    })
                    this.setState({ student_grades });
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

        let finalGrade = 0;
        const columns = [
            {
                Header: gettext('Evaluation'),
                accessor: 'designation',
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
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'center',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: gettext('Percentage'),
                accessor: 'percentage',
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'center',
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            {
                Header: gettext("To Final Grade"),
                Cell: props => {
                    return (
                        <p>{props.original.grade * (props.original.percentage / 100)}</p>
                    )
                },
                sortable: false,
                filterable: false,
                style: {
                    textAlign: 'center',
                },
                width: 150,
                maxWidth: 150,
                minWidth: 150,
            },
            {
                Header: gettext('Observations'),
                sortable: false,
                filterable: false,
            },
        ]

        return (
            <Container>
                <h2 className="title_main_menu">{gettext("Grades")}</h2>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">{gettext("Subject")}</Form.Label>
                        <Col sm="5">
                            <Form.Control
                                id="Subject"
                                name="Subject"
                                as="select"
                                onChange={this.handleSubjectChange}
                            >
                                {this.state.student_subjects.map(subject =>
                                    <option>{subject.designation}</option>
                                )}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">{gettext("Current Final Grade")}</Form.Label>
                        <Col sm="5">
                            <Form.Control plaintext readOnly defaultValue={
                                    this.state.student_grades.map(grade => 
                                        finalGrade += grade.grade * (grade.percentage / 100)
                                    )
                                }  >
                            </Form.Control>
                        </Col>   
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="btn btn-primary search_students_attendances"
                        onClick={this.getStudentSubjectGradesData}
                    >
                        {gettext("Search ")}
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Form>

                <br />

                <ReactTable
                    noDataText={gettext('No Results Found')}
                    data={this.state.student_grades}
                    resolveData={data => data.map(row => row)}
                    columns={columns}
                    defaultPageSize={3}
                >
                </ReactTable>
            </Container>
        )
    }
}

export default SearchStudentSubjectGrades;