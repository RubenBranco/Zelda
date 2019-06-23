import React from 'react';
import ReactDOM from "react-dom";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ShiftDashboard from "../Components/Menus/ShiftDashboard.jsx";

class StudentShiftManagement extends React.Component {
    constructor() {
        super();

    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Shift Management"), href: "" }];
        return (
            <div>
                <Navigator />
                <MenuStudLateral />
                <div class="resto-pagina2">
                <WebCrumbs pages={pages} />
                <ShiftDashboard />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentShiftManagement />, document.getElementById("main"));
export default StudentShiftManagement;
