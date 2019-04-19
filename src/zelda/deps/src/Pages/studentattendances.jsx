import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchOwnAttendances from "../Components/Searches/SearchOwnAttendances.jsx";


class StudentAttendances extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Navigator />
                <LanguageSwitch />
                <div id="navigation_Menu">
                    <a href="#">Menu</a> > <a> Consult Own Attendances</a>
                </div>
                <SearchOwnAttendances />
            </div>
        );
    }
}


ReactDOM.render(<StudentAttendances />, document.getElementById("main"));
export default StudentAttendances;
