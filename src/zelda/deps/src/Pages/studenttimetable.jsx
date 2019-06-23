import React from 'react';
import ReactDOM from "react-dom";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import Schedule from "../Components/Schedules/Schedule.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import getCsrfToken from "../functions/csrf.js";


class StudentTimeTable extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: [],
            selectedSubjects: {},
        };
        this.csrfmiddlewaretoken = getCsrfToken();
        this.filterClasses = this.filterClasses.bind(this);
    }

    componentDidMount() {
        if (!this.state.classes.length) {
            fetch('/api/timetable_lesson_spec/my_timetable/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let subjects = {};
                    data.map(lesson => {
                        if (!this.state.selectedSubjects.hasOwnProperty(lesson.subject_designation)) {
                            subjects[lesson.subject_designation] = {
                                active: true,
                                id: lesson.subject_id,
                            };
                        }
                    });
                    this.setState(prevState => ({
                        classes: [...prevState.classes, ...data],
                        selectedSubjects: { ...prevState.selectedSubjects, ...subjects },
                    }));
                });
            });
        }
    }

    selectSubjectHandle(subject, e) {
        let selectedSubjects = this.state.selectedSubjects;
        selectedSubjects[subject].active = !selectedSubjects[subject].active;
        this.setState({
            selectedSubjects: selectedSubjects,
        });
    }

    filterClasses() {
        let selectedSubjects = [];
        Object.keys(this.state.selectedSubjects).map(subject => {
            if (this.state.selectedSubjects[subject].active) {
                selectedSubjects.push(this.state.selectedSubjects[subject].id);
            }
        });
        return this.state.classes.filter(lesson => selectedSubjects.indexOf(lesson.subject_id) !== -1);
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Personal Schedule"), href: "" }];
        console.log(pages);
        return (
            <div>
                <Navigator />
                <MenuStudLateral />
                <div class="resto-pagina2">
                <WebCrumbs pages={pages} />
<<<<<<< HEAD
                <Container className="schedule">
                    <Tab.Container id="list-group-tabs-example" >
                        <Row>
                            <Col sm={3}>
=======
                <div className="resto-pagina">
                    <Container className="schedule">
                        <Tab.Container id="list-group-tabs-example" >
                            <Row >
                                <Col sm={1}> </Col>
                                <Col sm={1}>
>>>>>>> 9f73be4921b888a9732458bb39aa862a949cfb59
                                    {Object.keys(this.state.selectedSubjects).map(subject =>
                                        <div >
                                            <input
                                                type="checkbox"
                                                name={`${subject}-checkbox`} className="form-check-input"
                                                checked={this.state.selectedSubjects[subject].active}
                                                onChange={this.selectSubjectHandle.bind(this, subject)}
                                            />
                                            <label htmlFor={`${subject}-checkbox`}>
                                                {subject}
                                            </label>
                                        </div>
                                    )}

                                </Col>

                                <Col>
                                    {!this.state.classes.length ? null :
                                        <Schedule classes={this.filterClasses()} />
                                    }
                                </Col>
                            </Row>
                        </Tab.Container>
                    </ Container >
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentTimeTable />, document.getElementById("main"));
export default StudentTimeTable;
