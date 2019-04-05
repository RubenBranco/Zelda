import React from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GetProfessorSubjects from "../GetProfessorSubjects.jsx";

class SearchShiftlessStudents extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
    }

    render () {
        return (
            <Container>
                 <Form>        
                    <GetProfessorSubjects display="select"/>   
                    <Button
                        variant="primary"
                        className="btn btn-primary"
                        type="submit"
                    >
                        {gettext("Search")}
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default SearchShiftlessStudents;