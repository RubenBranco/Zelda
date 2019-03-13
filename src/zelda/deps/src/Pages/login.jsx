import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from "../Components/LoginForm.jsx";
// import LanguageSwitch from "../Components/LanguageSwitch";
import Container from 'react-bootstrap/Button';

class Login extends React.Component{

    constructor() {

        super();
        this.state;
    }

    render() {

        return (
            <div>
                <Container>
                    <LoginForm  url={window.url} />
                    {/* <LanguageSwitch /> */}
                </Container>
            </div>
        )


    }

}

ReactDOM.render(<Login />, document.getElementById("main"));
export default Login;
