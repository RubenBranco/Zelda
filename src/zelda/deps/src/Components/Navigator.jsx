import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Navigator extends React.Component{
    render(){
        return(
            <Navbar expand="sm" bg="dark" variant="dark">
            <img
                src="../../static/img/zelda.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            <img
                src="../../static/img/logofcul.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
                <Navbar.Brand href="#home">ZELDA</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">UserEmail</Nav.Link>
                    <Nav.Link href="#features">{gettext("Messages")}</Nav.Link>
                    <Nav.Link href="#pricing">{gettext("Notifications")}</Nav.Link>

                    <form class="form-inline pull-right">
                        <button class="btn btn-outline-danger" type="submit">{gettext("Logout")}</button>
                    </form>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigator;