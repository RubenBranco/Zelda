import React from "react";
import Image from "react-bootstrap/Image";
import StudentMenu from "./Menus/StudentMenu.jsx";
import ProfessorMenu from "./Menus/ProfessorMenu.jsx";

import getCsrfToken from "../functions/csrf.js";


class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            userRole: null,
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
                    userRole: data.user_type,
                });
            })
        });
    }

    render() {
        let menu = null;
        if (this.state.userRole === "Student") {
            menu = <StudentMenu />;
        } else if (this.state.userRole === "Professor") {
            menu = <ProfessorMenu />;
        }

        return (
            <div>
                <div id="mainMenu">
                    {menu}
                </div>
            </div>
        );
    }
}

export default MainMenu;
