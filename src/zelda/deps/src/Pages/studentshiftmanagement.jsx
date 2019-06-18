import React from 'react';
import ReactDOM from "react-dom";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
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
                <MenuStudLateral />
                <div class="resto-pagina">
                <ShiftDashboard />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentShiftManagement />, document.getElementById("main"));
export default StudentShiftManagement;
