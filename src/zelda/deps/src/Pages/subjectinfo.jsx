import React from 'react';
import ReactDOM from "react-dom";

import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ViewCurricularUnitData from "../Components/ViewCurricularUnitData.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";


class SubjectInfo extends React.Component {
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
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Information"), href: "" }];
        return (
            <div>
                <Navigator />
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
                    <h2 className="title_main_menu">{gettext("Subject Information")}</h2>
                    <div className="menu2">
                        <ViewCurricularUnitData />
                    </div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<SubjectInfo />, document.getElementById("main"));
export default SubjectInfo;
