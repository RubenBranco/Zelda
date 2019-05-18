import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import ShiftDashboard from "../Components/Menus/ShiftDashboard.jsx";

class StudentShiftManagement extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <Navigator />
                <ShiftDashboard />
            </div>
        );
    }
}

ReactDOM.render(<StudentShiftManagement />, document.getElementById("main"));
export default StudentShiftManagement;
