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
                <SearchOwnAttendances />
            </div>
        );
    }
}


ReactDOM.render(<StudentAttendances />, document.getElementById("main"));
export default StudentAttendances;
