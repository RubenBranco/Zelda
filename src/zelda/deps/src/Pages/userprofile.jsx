import React from "react";
import ReactDOM from "react-dom";

import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navbar from "../Components/Navigator.jsx";
import ViewProfile from "../Components/ViewProfile.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";


class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            userRole: null,
        };
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
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Profile"), href: "" }];
        return (
            <div>
                <Navbar />
                {this.state.userRole !== null ?
                    this.state.userRole === "Student" ?
                    <MenuStudLateral />
                    :
                    <MenuProfLateral />
                    :
                    null
                }
                <div className="resto-pagina2">
                    <WebCrumbs pages={pages} />
                    <ViewProfile />
                </div>
            </div >
        );
    }
}

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
