import React from 'react';
import ReactDOM from "react-dom";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ShiftDashboard from "../Components/Menus/ShiftDashboard.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class StudentShiftManagement extends React.Component {
    constructor() {
        super();

    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Enroll / Unsubscribe in Shifts"), href: "" }];
        return (

            <div>
                <Navigator />
                <MenuStudLateral />
                <div className="resto-pagina2">
                <WebCrumbs pages={pages} />
                <ShiftDashboard />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentShiftManagement />, document.getElementById("main"));
export default StudentShiftManagement;
