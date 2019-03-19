import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            email: "",
            password: "",
            error: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        fetch(this.props.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(function (response) {
            if (response.hasOwnProperty("next")) {
                location.change(response.next);
            } else {
                this.setState({ error: gettext("Invalid credentials.") });
            }
        }).catch(function (error) {
            this.setState({ error: gettext("Unable to connect. Try again later.")});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Image src="../../static/img/logo.png" id="img_form" />
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder={gettext("Enter email")}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder={gettext("Password")}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    className="btn btn-primary btn-lg btn-block button_login "
                    type="submit"
                >
                    {gettext("Login")}
                </Button>

                {this.state.error ? (
                    <Alert variant="danger">{this.state.error}</Alert>
                ) : null}

            </Form>
        );
    }
}

export default LoginForm;
