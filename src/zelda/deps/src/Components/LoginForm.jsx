import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class LoginForm extends React.Component {

    constructor (props) {
        super(props);

        this.props = props;
        this.state = {};
    }

    render () {
        return (
            <Form>
                <Form.Group >
                  <Form.Label>Email: </Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group >
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="button">
                  Submit
                </Button>
          </Form>
        )
    }
}

export default LoginForm;
