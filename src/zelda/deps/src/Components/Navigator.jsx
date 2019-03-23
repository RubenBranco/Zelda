import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Navigator extends React.Component{
    render(){
        return(
            <Navbar id="navbar">
                <Nav className="mr-auto">
                <img
                    alt=""
                    src="../../static/img/zelda.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top navLogoImages"
                />
                <img
                    alt=""
                    src="../../static/img/logofcul.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top navLogoImages"
                />
                <Navbar.Brand href="#home">
                    
                </Navbar.Brand>

                <Nav.Link className="navlinks" href="#home">Logout</Nav.Link>
                <Nav.Link className="navlinks" href="#features">Notifications</Nav.Link>
                <img
                    alt=""
                    src="../../static/img/notification.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top navImage"
                />
                <Nav.Link className="navlinks" href="#pricing">Messages</Nav.Link>
                <img
                    alt=""
                    src="../../static/img/messages.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top navImage"
                />
                <Nav.Link className="navlinks" href="#pricing">emailDoUser</Nav.Link>
                <img
                    alt=""
                    src="../../static/img/profileImage.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top navImage"
                />
                </Nav>
             </Navbar>
        )
    }
}

export default Navigator;