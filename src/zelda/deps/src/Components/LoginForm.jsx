import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate() {
    let emailError = "";
    let passwordError = "";

    if (
      !/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,4}$/.test(
        this.state.email
      )
    ) {
      emailError = gettext("Invalid email");
      this.setState({ emailError });
      return false;
    }

    if (!this.state.password.length > 0) {
      passwordError = gettext("Please enter Password");
      this.setState({ passwordError });
      return false;
    } else if (this.state.password.length >= 20) {
      passwordError = gettext("Password is too long");
      this.setState({ passwordError });
      return false;
    }

    return true;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Image src="../../static/img/logo.png" id="img_form" />
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder={gettext("Enter email")} />
        </Form.Group>
        {this.state.emailError ? (
          <Alert variant="danger">{this.state.emailError}</Alert>
        ) : null}
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="btn btn-primary btn-lg btn-block button_login"
          type="button"
        >
          {gettext("Login")}
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
