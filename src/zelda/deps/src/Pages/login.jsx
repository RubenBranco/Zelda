import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from "../Components/LoginForm.jsx";
// import LanguageSwitch from "../Components/LanguageSwitch";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Login extends React.Component{

    constructor() {

        super();
        this.state;
    }

    render() {

        return (
            <Jumbotron fluid>
            <Row>
                <Col xs={5} md={4}></Col>
                <Col xs={5} md={4}>
                    <LoginForm  url={window.url} />
                    {/* <LanguageSwitch /> */}
                </Col>
                <Col xs={5} md={4}></Col>
                
            </Row>
            </Jumbotron>
        )


    }

}

ReactDOM.render(<Login />, document.getElementById("main"));
export default Login;
