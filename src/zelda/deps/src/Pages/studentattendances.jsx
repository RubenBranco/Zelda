import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchOwnAttendances from "../Components/Searches/SearchOwnAttendances.jsx";
import LanguageSwitch from "../Components/LanguageSwitch.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class StudentAttendances extends React.Component {
    constructor() {
        super();
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Attendances"), href: "" }];
        return (
            <div>
                <Navigator />
                <MenuStudLateral />
                <WebCrumbs pages={pages} />
                <SearchOwnAttendances />


            </div>
        );
    }
}


ReactDOM.render(<StudentAttendances />, document.getElementById("main"));
export default StudentAttendances;
