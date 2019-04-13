import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import getCsrfToken from "../functions/csrf.js";


class ViewProfile extends React.Component{
    constructor() {
        super();
        this.state = {
            userData: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        fetch("/api/appuser/describe_self/", {
            method: "GET",
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userData: data,
                })
                console.log(this.state.userData);
            })
        });
    }

    render () {
        return (
            <Container>
                <h2>Profile</h2>
                <hr />

                <Row>
                    <Col xs={2} md={3}>
                        <Image src={this.state.userData.display_image} rounded/>
                    </Col>
                    <Col xs={2} md={5}>
                        <Tabs defaultActiveKey="Personal Data">
                            <Tab eventKey="Personal Data" title="Personal Data">
                                <Table bordered hover responsive size='sm'>
                                    <tbody>
                                        <tr>
                                        <td>{gettext("Your Name")}</td>
                                        <td>{this.state.userData.first_name + " " + this.state.userData.last_name}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Gender")}</td>
                                        <td>{this.state.userData.gender == "m" ? 'Male' : 'Female'}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Nº Identification Document")}</td>
                                        <td>{this.state.userData.n_cc}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Taxpayer Number")}</td>
                                        <td>{this.state.userData.nif}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Profession")}</td>
                                        <td>{this.state.userData.professional_occupation}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Marital Status")}</td>
                                        <td>{this.state.userData.marital_status}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Date of Birth")}</td>
                                        <td>{this.state.userData.dob}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Nationality")}</td>
                                        <td>{this.state.userData.country} falta a nacionalidade</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Country of Birth")}</td>
                                        <td>{this.state.userData.country} texto por extenso</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="Contactos" title={gettext("Contacts")}>
                                <Table bordered hover responsive size='sm'>
                                    <tbody>
                                        <tr>
                                        <td>{gettext("Address")}</td>
                                        <td>falta a morada</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Telephone")}</td>
                                        <td>{this.state.userData.contact}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Emergency Contact")}</td>
                                        <td>{this.state.userData.emergency_contact}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Personal Email")}</td>
                                        <td>{this.state.userData.email}</td>
                                        </tr>
                                        <tr>
                                        <td>{gettext("Institutional Email")}</td>
                                        <td>{this.state.userData.institutional_email}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>
                        <Button variant="primary">Update</Button>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default ViewProfile;
