import React from "react";
import ReactDOM from "react-dom";

import Navbar from "../Components/Navigator.jsx";
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import getCsrfToken from "../functions/csrf.js";


class ReviewShiftStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            shifts: [],
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

    componentDidMount () {
        if (!this.state.shifts.length) {
            fetch('/api/shift/lectured_shifts/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        shifts: data,
                    });
                });
            })
        }
    }

    handleShiftStateChange(shift, open, e) {
        fetch(`/api/shift/${shift.id}/change_open_state/?is_open=${open}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.csrfmiddlewaretoken,
                "Accept": "application/json",
            },
        }).then(response => {
            if (response.status === 200) {
                let action = open ? gettext("opened") : gettext("closed");
                toast.success(gettext(
                    `Successfully ${action} shift ${shift.code}`
                ), this.toastSettings);

                let shifts = [];
                this.state.shifts.map(_shift => {
                    if (_shift.id === shift.id) {
                        _shift.is_open = open;
                    }
                    shifts.push(_shift);
                });

                this.setState({
                    shifts: shifts,
                })
            } else if (response.status === 403) {
                toast.error(gettext(
                    "Something went wrong with your request. Try again later."
                ), this.toastSettings);
            }
        });
    }


    render() {
        return (
            <div>
                <Navbar />
                <Table className="sift-requests-table">
                    <thead>
                        <tr>
                            <th>{gettext("Subject")}</th>
                            <th>{gettext("Shift")}</th>
                            <th>{gettext("Enrolled Students")}</th>
                            <th>{gettext("Total Vacancies")}</th>
                            <th>{gettext("State")}</th>
                            <th>{gettext("Options")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.shifts.map(shift =>
                            <tr>
                                <td>{shift.subject_name}</td>
                                <td>{shift.code}</td>
                                <td>{shift.enrolled_students}</td>
                                <td>{shift.vacancies}</td>
                                <td>
                                {shift.is_open ?
                                    <Badge pill variant="info">
                                        {gettext("Open")}
                                    </Badge>
                                    :
                                    <Badge pill variant="danger">
                                        {gettext("Closed")}
                                    </Badge>
                                }
                                </td>
                                <td>
                                    {shift.is_open ?
                                        <Button variant="outline-danger" onClick={this.handleShiftStateChange.bind(this, shift, false)}>
                                            {gettext("Close")}
                                        </Button>
                                        :
                                        <Button variant="outline-success" onClick={this.handleShiftStateChange.bind(this, shift, true)}>
                                            {gettext("Open")}
                                        </Button>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
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

ReactDOM.render(<ReviewShiftStatus />, document.getElementById("main"));
export default ReviewShiftStatus;

