import React from 'react';
import ReactDOM from "react-dom";

import Navigator from "../Components/Navigator.jsx";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import MenuStudLateral from '../Components/Menus/MenuStudLateral.jsx';
import Table from 'react-bootstrap/Table';

import getCsrfToken from "../functions/csrf.js";
import 'react-toastify/dist/ReactToastify.min.css';



class SubjectSignup extends React.Component {
    constructor() {
        super();
        this.state = {
            subjects: {},
            courseYearMap: {},
            firstSemesterEcts: 0,
            secondSemesterEcts: 0,
            maxEctsPerSemester: 0,
            currentSemester: 0,
        };
        this.csrfmiddlewaretoken = getCsrfToken();
        this.canUnenroll = this.canUnenroll.bind(this);
        this.canEnroll = this.canEnroll.bind(this);

        this.toastSettings = {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };
    }

    componentDidMount () {
        if (!Object.keys(this.state.subjects).length) {
            fetch("/api/course/my_curriculum/", {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let subjects = {};
                    let courseYearMap = {};
                    data.subjects.map(subject => {
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
                        firstSemesterEcts: data.first_semester_ects,
                        secondSemesterEcts: data.second_semester_ects,
                        maxEctsPerSemester: data.max_ects_per_semester,
                        currentSemester: data.current_semester,
                    });
                });
            });
        }
    }

    canUnenroll(subject) {
        return subject.subject.semester === "2" || this.state.currentSemester !== "2";
    }

    canEnroll(subject) {
        let currentEcts = subject.subject.semester === "1" ? this.state.firstSemesterEcts : this.state.secondSemesterEcts;
        return currentEcts + subject.subject_spec.ects <= this.state.maxEctsPerSemester;
    }

    enrollOrUnenrollSubject(subject, enroll, e) {
        fetch(`/api/subject/${subject.subject.id}/sign_up/?sign_up=${enroll}`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            if (response.status === 200) {
                let action = enroll ? gettext("Enrolled in") : gettext("Unenrolled from");
                toast.success(gettext(
                    `Successfully ${action} ${subject.course_subject.designation}`
                ), this.toastSettings);

                let subjects = this.state.subjects;
                let firstSemesterEcts = this.state.firstSemesterEcts;
                let secondSemesterEcts = this.state.secondSemesterEcts;

                if (subject.subject.semester === "1") {
                    firstSemesterEcts += enroll ? subject.subject_spec.ects : (-subject.subject_spec.ects);
                } else {
                    secondSemesterEcts += enroll ? subject.subject_spec.ects : (-subject.subject_spec.ects);
                }
                subjects[subject.subject.id].is_enrolled = enroll;
                this.setState({
                    subjects: subjects,
                    firstSemesterEcts: firstSemesterEcts,
                    secondSemesterEcts: secondSemesterEcts,
                });
            } else {
                toast.error(gettext(
                    "Something went wrong with your request. Try again later."
                ), this.toastSettings);
            }
        });
    }

    render() {
        let courseYearKeys = Object.keys(this.state.courseYearMap).sort();

        return (
            <div>
                <Navigator />
                <Container>
                    <h2>{gettext("Subject Management")}</h2>
                    <Table responsive="sm" size="sm" striped={true}>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>{gettext("Name")}</th>
                            <th>{gettext("Status")}</th>
                            <th>{gettext("Course Year")}</th>
                            <th>{gettext("Carried Out In")}</th>
                            <th>{gettext("ECTS")}</th>
                            <th>{gettext("Action")}</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!courseYearKeys.length ? null :
                                courseYearKeys.map(courseYear =>
                                    this.state.courseYearMap[courseYear].map((subjectId, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{this.state.subjects[subjectId].course_subject.designation}</td>
                                            <td>{this.state.subjects[subjectId].is_enrolled.toString() ? gettext("Enrolled"): gettext("Not Enrolled")}</td>
                                            <td>{this.state.subjects[subjectId].course_subject.course_year}</td>
                                            <td>{this.state.subjects[subjectId].subject.semester}</td>
                                            <td>{this.state.subjects[subjectId].subject_spec.ects}</td>
                                            <td>
                                                {this.state.subjects[subjectId].is_enrolled ?
                                                        this.canUnenroll(this.state.subjects[subjectId]) ?
                                                        <Button onClick={this.enrollOrUnenrollSubject.bind(this, this.state.subjects[subjectId], false)} variant="outline-danger">{gettext("Unenroll")}</Button>
                                                        :
                                                        null
                                                        :
                                                        this.canEnroll(this.state.subjects[subjectId]) ?
                                                        <Button onClick={this.enrollOrUnenrollSubject.bind(this, this.state.subjects[subjectId], true)} variant="outline-success">{gettext("Enroll")}</Button>
                                                        :
                                                        null
                                                }
                                            </td>
                                            <td>
                                            <Button href={window.viewSubjectUrl.replace("0", subjectId.toString())} variant="outline-info">{gettext("Subject Info")}</Button>
                                            </td>
                                        </tr>
                                    )
                            )
                            }

                        </tbody>
                    </Table>
                </Container>

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

ReactDOM.render(<SubjectSignup />, document.getElementById("main"));
export default SubjectSignup;
