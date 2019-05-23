import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentsAttendance from "../Components/Searches/SearchStudentsAttendance.jsx";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class ProfAttendances extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Consult Attendance"), href: "" }];
        return (
            <div>
            <Navigator />
            <MenuProfLateral />
            <SearchStudentsAttendance />
            </div>
        );
    }
}

ReactDOM.render(<ProfAttendances />, document.getElementById("main"));
export default ProfAttendances;
