import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';


class Navigator extends React.Component{
    render(){
        return(
            <Navbar id="navbar">
                <Nav className="mr-auto">
                    <Navbar.Brand href={window.frontpageUrl}>
                        <Image
                            alt=""
                            src={window.zeldaLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top navLogoImages"
                        />
                        <Image
                            alt=""
                            src={window.fculLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top navLogoImages"
                        />
                    </Navbar.Brand>
                    
                    <Image
                        alt=""
                        src={window.userImageUrl}
                        width="30"
                        height="30"
                        className="d-inline-block align-top navImage"
                    />

                    <Navbar.Text>
                        {window.firstName} {window.lastName}
                    </Navbar.Text>

                    <Nav.Link className="navlinks" href={window.logoutUrl}>Logout</Nav.Link>
                    <Nav.Link className="navlinks" href={window.webmailUrl} target="_blank">
                        <Image
                            alt=""
                            src={window.messageIcon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top navImage"
                        />
                    </Nav.Link>
                </Nav>
             </Navbar>
        )
    }
}

export default Navigator;
