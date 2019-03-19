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
      emailError: "",
      passwordError: "",
      errorMessage: "",
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
    }).then(function(response) {
      if (response.ok) {
        console.log("20");
        if (response.qualquer_coisa == "Username or Password incorrect") {
          this.setState({ errorMessage: "Username or Password incorrect"})
        } else {
          // change page with props
        }
          // se correu tudo bem, passamos para outra pagina, dando como prop o email
      } else {
        this.setState({ errorMessage: 'Network response was not ok.'});
        console.log(this.state.errorMessage);
      }
    })
    .catch(function(error) {
      this.setState({ errorMessage: 'There has been a problem with your fetch operation: ' + error.message});
      console.log(this.state.errorMessage);
    });
  }

  validate() {
    let emailError = "";
    let passwordError = "";
    let counter = 0;

    if (!/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,4}$/.test(this.state.email)) {
      console.log(this.state.email);
      emailError = gettext("Invalid email");
      this.setState({ emailError });
      counter++;
    } else if (!this.state.email.length > 0 ){
      emailError = gettext("Please enter Email");
      this.setState({ emailError });
      counter++;
    }

    if (!this.state.password.length > 0) {
      passwordError = gettext("Please enter Password");
      this.setState({ passwordError });
      counter++;
    } else if (this.state.password.length >= 20) {
      passwordError = gettext("Password is too long");
      this.setState({ passwordError });
      counter++;
    }

    if (counter > 0) {
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
    const data = new FormData(event.target);
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        emailError: "",
        passwordError: "",
      });
      console.log("1");
      this.login();
      console.log("2");
    }
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

        {this.state.emailError ? (
          <Alert variant="danger">{this.state.emailError}</Alert>
        ) : null}

        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder={gettext("Password")}
            onChange={this.handleChange}
          />
        </Form.Group>

        {this.state.passwordError ? (
          <Alert variant="danger">{this.state.passwordError}</Alert>
        ) : null}

        <Button
        variant="primary"
        className="btn btn-primary btn-lg btn-block button_login "
        type="submit"
        >
        {gettext("Login")}
      </Button>

        {this.state.errorMessage ? (
          <Alert variant="danger">{this.state.errorMessage}</Alert>
        ) : null}

      </Form>
    );
  }
}

export default LoginForm;
