import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import WebCrumbs from "../Components/WebCrumbs.jsx";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import getCsrfToken from "../functions/csrf.js";


class ReviewExchangeRequests extends React.Component{
    constructor() {
        super();
        this.state = {
            requests: [],
        };

        this.csrfmiddlewaretoken = getCsrfToken();
        this.toastSettings = {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };
    }

    componentDidMount() {
        if (!this.state.requests.length) {
            fetch("/api/shift_xg_requests/my_requests", {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        requests: data,
                    })
                });
            });
        }
    }

    handleRequestAction(request, acceptance, e) {
        fetch(`/api/shift_xg_requests/${request.id}/modify/?acceptance=${acceptance}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.csrfmiddlewaretoken,
                "Accept": "application/json",
            },
        }).then(response => {
            if (response.status === 200) {
                let action = acceptance ? gettext("accepted") : gettext("denied");
                toast.success(gettext(
                    `Successfully ${action} the request by ${request.user.first_name} ${request.user.last_name}`
                ), this.toastSettings);
                let newRequestList = [];
                this.state.requests.map(_request => {
                    if (_request.id !== request.id) {
                        newRequestList.push(_request);
                    }
                });
                this.setState({
                    requests: newRequestList
                });
            } else if (response.status === 403) {
                toast.error(gettext(
                    "Something went wrong with your request. Try again later."
                ), this.toastSettings);
            }
        });
    }

    render () {
      return (
          <div>
                <Navigator />
                <MenuProfLateral />
                <div class="resto-pagina2">
                <h2 className="title_main_menu">{gettext("Shift Exchange Requests")}</h2>

                <Table className="sift-requests-table">
                    <thead>
                        <tr>
                            <th>{gettext("Subject")}</th>
                            <th>{gettext("Shift")}</th>
                            <th>{gettext("Shift Capacity")}</th>
                            <th>{gettext("Student Name")}</th>
                            <th>{gettext("Student Number")}</th>
                            <th>{gettext("Options")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map(request =>
                            <tr>
                                <td>{request.subject_name}</td>
                                <td>{request.shift.code}</td>
                                <td>{request.capacity}</td>
                                <td>{request.user.first_name} {request.user.last_name}</td>
                                <td>{request.student.number}</td>
                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup className="mr-2">
                                            <Button variant="outline-success" onClick={this.handleRequestAction.bind(this, request, true)}>
                                                {gettext("Accept")}
                                            </Button>
                                        </ButtonGroup>
                                        <ButtonGroup>
                                            <Button variant="outline-danger" onClick={this.handleRequestAction.bind(this, request, false)}>
                                                {gettext("Deny")}
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
          </div>
      );
    }
}

ReactDOM.render(<ReviewExchangeRequests />, document.getElementById("main"));
export default ReviewExchangeRequests;
