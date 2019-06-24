import React from 'react';
import ReactDOM from "react-dom";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import Navigator from "../Components/Navigator.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import getCsrfToken from "../functions/csrf.js";


class StudentCurriculum extends React.Component {
    constructor() {
        super();
        this.state = {
            subjects: {},
            courseYearMap: {},
        };

        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        if (!Object.keys(this.state.subjects).length) {
            fetch("/api/course/my_global_curriculum/", {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let subjects = {};
                    let courseYearMap = {};

                    data.map(subject => {
                        let subjectId = subject.subject.id;
                        subjects[subjectId] = subject;
                        let courseYear = subject.course_subject.course_year;
                        if (!courseYearMap.hasOwnProperty(courseYear)) {
                            courseYearMap[courseYear] = [];
                        }
                        courseYearMap[courseYear].push(subjectId);
                    });
                    this.setState({
                        subjects: subjects,
                        courseYearMap: courseYearMap,
                    });
                });
            });
        }
    }

    render() {
        let courseYearKeys = Object.keys(this.state.courseYearMap).sort();
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Curriculum"), href: "" }];
        return (
            <div>
                <Navigator />
                <MenuStudLateral />
                <div class="resto-pagina2">
                    <WebCrumbs pages={pages} />
                    <Container>
                        <h2 className="title_main_menu">{gettext("Your Curriculum")}</h2>
                        <Table responsive="sm" size="sm" striped={true}>
                            <thead>
                                <tr>
                                    <th>{gettext("Course Year")}</th>
                                    <th>{gettext("Code")}</th>
                                    <th>{gettext("Designation")}</th>
                                    <th>{gettext("ECTS")}</th>
                                    <th>{gettext("Grade")}</th>
                                    <th>{gettext("EECC")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!courseYearKeys.length ? null :
                                    courseYearKeys.map(courseYear =>
                                        this.state.courseYearMap[courseYear].map(subjectId =>
                                            <tr>
                                                <td>{this.state.subjects[subjectId].course_subject.course_year}</td>
                                                <td>{this.state.subjects[subjectId].subject_spec.code}</td>
                                                <td>{this.state.subjects[subjectId].course_subject.designation}</td>
                                                <td>{this.state.subjects[subjectId].subject_spec.ects}</td>
                                                <td>{this.state.subjects[subjectId].hasOwnProperty("grade") ?
                                                    this.state.subjects[subjectId].grade.grade :
                                                    "-"
                                                }</td>
                                                <td>{this.state.subjects[subjectId].hasOwnProperty("grade") ?
                                                    this.state.subjects[subjectId].grade.eecc :
                                                    "-"
                                                }</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentCurriculum />, document.getElementById("main"));
export default StudentCurriculum;
