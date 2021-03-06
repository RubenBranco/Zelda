import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import getCsrfToken from "../functions/csrf.js";


class ViewProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
        this.hasFetched = false;
    }

    componentDidMount() {
        if (!this.hasFetched) {
            let pathName = window.location.pathname.split("/");
            let userId = pathName[pathName.length - 2];
            fetch(`/api/appuser/${userId}/`, {
                method: "GET",
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        userData: data,
                    })
                })
            });
            this.hasFetched = true;
        }
    }

    render() {
        return (
            <div>
                <h2 className="title_main_menu">{gettext("Profile")}</h2>
                <Container id="container">


                    <hr />

                    <Row className="rowjustify-content-md-center" id="rowProfile">
                        <Col xs={2} md={3}>


                        </Col>
                        <Col xs={2} md={5}>

                            <Table id="profile_table" bordered hover responsive size='sm' className="row justify-content-md-center">
                                <tbody>
                                    <tr>
                                        <td>{gettext("Name")}</td>
                                        <td>{this.state.userData.first_name + " " + this.state.userData.last_name}</td>
                                    </tr>
                                    <tr>
                                        <td>{gettext("Institutional Email")}</td>
                                        <td>{this.state.userData.institutional_email}</td>
                                    </tr>
                                    <tr>
                                        <td>{gettext("Gender")}</td>
                                        <td>{this.state.userData.gender == "m" ? 'Male' : 'Female'}</td>
                                    </tr>
                                    <tr>
                                        <td>{gettext("Country")}</td>
                                        <td>{this.state.userData.country}</td>
                                    </tr>
                                </tbody>
                            </Table>


                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ViewProfile;
