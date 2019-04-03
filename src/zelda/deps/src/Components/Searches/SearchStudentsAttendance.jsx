import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class SearchStudentsAttendance extends React.Component{
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            courses: [],
            course: "",
            curricularUnits: [],
            curricularUnit: "",
            Class: "",
            classType: "",
            fromDate: "",
            results: [],
            error: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        // GET COURSES
        fetch('/api/course_spec/', {
            method: "GET",
            headers: {
                "X-CSRFToken": csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                let courses = [];
                data.map(course => {
                    courses.push({
                        id: course.id,
                        designation: course.designation,
                    })
                });
                this.setState({ courses });
                // GET COURSES SUBJECTS
                fetch(`/api/course?coursesubects=${this.state.courses[0].id}`, {
                    method: "GET",
                    headers: {
                        "X-CSRFToken": csrfmiddlewaretoken,
                    },
                }).then(response => {
                    response.json().then(data => {
                        console.log(data);
                        let curricularUnits = [];
                        data.map(curricularUnit => {
                            curricularUnits.push({
                                id: curricularUnit.id,
                                designation: curricularUnit.designation,
                            })
                        });
                        this.setState({ curricularUnits });
                    })
                })
            })
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state);
    }

    render () {
        return( 
            <div>
                <Container>
                    <h2>Consult Students Attendances</h2>
                    <hr />

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="First Name">
                                <Form.Label>{gettext("First Name")}</Form.Label>
                                <Form.Control 
                                    id="First Name" 
                                    name="firstName" 
                                    type="text" 
                                    onChange={this.handleChange}
                                    placeholder={gettext("First Name")} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Last Name">
                                <Form.Label>{gettext("Last Name")}</Form.Label>
                                <Form.Control 
                                    id="Last Name" 
                                    name="lastName" 
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder={gettext("Last Name")}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="Courses">
                                <Form.Label>{gettext("Course")}</Form.Label>
                                <Form.Control 
                                    id="Course" 
                                    name="course" 
                                    as="select"
                                    onChange={this.handleChange}
                                    >
                                    {this.state.courses.map(course => 
                                        <option>{course.designation}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Curricular Unit">
                                <Form.Label>{gettext("Curricular Unit")}</Form.Label>
                                <Form.Control 
                                    id="Curricular Unit" 
                                    name="curricularUnit" 
                                    as="select"
                                    onChange={this.handleChange}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Class">
                                <Form.Label>{gettext("Class")}</Form.Label>
                                <Form.Control 
                                    id="Class" 
                                    name="Class" 
                                    as="select"
                                    onChange={this.handleChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>tefoder</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Class Type">
                                <Form.Label>{gettext("Class Type")}</Form.Label>
                                <Form.Control 
                                    id="Class Type" 
                                    name="classType" 
                                    as="select"
                                    onChange={this.handleChange}>
                                    <option>1</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button
                            variant="primary"
                            className="btn btn-primary"
                            type="submit"
                        >
                            {gettext("Search")}
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default SearchStudentsAttendance;