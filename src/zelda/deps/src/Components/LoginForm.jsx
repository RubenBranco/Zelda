import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
}


class LoginForm extends React.Component {

    constructor (props) {
        super(props);

        this.props = props;
        this.state = initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validate(){
        let emailError =  "";
        let passwordError = "";

        if(!/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,4}$/.test(this.state.email)) {
            emailError = gettext("Invalid email");
            this.setState({emailError});
            return false;
        }

        if(!this.state.password.length > 0) {
            passwordError = gettext("Please enter Password");
            this.setState({passwordError});
            return false;
        }
        else if(this.state.password.length >= 20){
            passwordError = gettext("Password is too long");
            this.setState({passwordError});
            return false;
        }
        
        return true;
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        if(isValid){
            this.setState(initialState);
        }        
    }

    render () {
        return (
            <Form className="border border-white p-5" onSubmit={this.handleSubmit}>
                <Form.Group >
                  <Form.Label>Email: </Form.Label>
==== BASE ====
                  <Form.Control type="email" placeholder={gettext("Enter email")} />
==== BASE ====
                </Form.Group>
                
                {this.state.emailError ? <Alert variant="danger">{this.state.emailError}</Alert> : null }
                
                <Form.Group >
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                </Form.Group>
==== BASE ====

                <Button variant="primary" type="button">
                  { gettext("Login") }
==== BASE ====
                </Button>
          </Form>
        )
    }
}

export default LoginForm;
