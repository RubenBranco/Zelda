import React from 'react';
import ReactDOM from "react-dom";

import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import { ToastContainer, toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import WebCrumbs from "../Components/WebCrumbs.jsx";

import 'react-toastify/dist/ReactToastify.min.css';
import getCsrfToken from "../functions/csrf.js";


class ProfessorUploadGrades extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            prof_subjects: [],
            selectedSubject: null,
        };

        this.csrfmiddlewaretoken = getCsrfToken();
        this.toastSettings = {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
            });
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
                let prof_subjects = [];
                data.map(subject => {
                    prof_subjects.push(subject[0]);
                });
                this.setState({
                    selectedSubject: prof_subjects[0].subject.toString(),
                    prof_subjects: prof_subjects,
                });
            })
        });
    }

    handleSubjectChange() {
        this.setState({
            selectedSubject: event.target.value,
        });
    }

    ParsingException() {
        this.error = "ParsingError";
    }

    parseGrades(text) {
        let grades = [];
        text.split("\n").map(grade => {
            let fields = grade.split(",");
            if (fields.length !== 3) {
                throw new this.ParsingException();
            }
            grades.push({
                "student_number": Number(fields[0]),
                "eecc": fields[1],
                "grade": Number(fields[2]),
            });
        });
        return grades;
    }

    handleUpload() {
        try {
            let grades = this.parseGrades(document.getElementById("gradeText").value);
            fetch(`/api/subject/${this.state.selectedSubject}/batch_grades/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
                body: JSON.stringify({
                    grades: grades,
                    csrfmiddlewaretoken: this.csrfmiddlewaretoken,
                }),
            }).then(response => {
                if (response.status === 200) {
                    toast.success(gettext("Grades uploaded successfully"), this.toastSettings);
                } else if (response.status === 403) {
                    toast.error(gettext(
                        "Something went wrong with your request. Try again later."
                    ), this.toastSettings);
                }
            });
        } catch (e) {
            if (e.error === "ParsingError") {
                toast.error(gettext(
                    "Formatting error in grade information. Verify if format is being followed."
                ), this.toastSettings);
            }
        }
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Upload Grades"), href: "" }];
        return (
            <div>
                <Navigator />
                <MenuProfLateral />
                <div class="resto-pagina2">
                    <WebCrumbs pages={pages} />
                    <h2 class="title_main_menu">{gettext("Upload Grades")}</h2>
                    <Form id="inserir_notas">
                        <Form.Row>
                            <Form.Group as={Col} controlId="Subjects">
                                <Form.Label>{gettext("Subjects")}</Form.Label>
                                <Form.Control
                                    className="selecting_subjects"
                                    id="Subjects"
                                    name="subject"
                                    as="select"
                                    onChange={this.handleSubjectChange}
                                >
                                    {this.state.prof_subjects.map(subject =>
                                        <option value={subject.subject}>{subject.designation}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="grades">
                                <Form.Label>{gettext("Grades")}</Form.Label>
                                <Form.Control as="textarea" rows="4" id="gradeText" />
                                <Form.Text className="text-muted">
                                    {gettext("One grade per line, each value seperated by a comma(\",\"). The format is the following: student number, eecc, grade")}
                                </Form.Text>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="submit">
                                <Button onClick={this.handleUpload} id="test-table-xls-button" cvariant="outline-success">{gettext("Upload")}</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

ReactDOM.render(<ProfessorUploadGrades />, document.getElementById("main"));
export default ProfessorUploadGrades;
