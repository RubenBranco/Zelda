import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentsAttendance from "../Components/Searches/SearchStudentsAttendance.jsx";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";

class ProfAttendances extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        return (
            <div>
                <Navigator />
                <div id="webcrumbs"> <a>{gettext("Home")}</a> > <a> {gettext("Consult Students Attendances")}</a> </div>
                <MenuProfLateral />
                <SearchStudentsAttendance />
            </div>
        );
    }
}

ReactDOM.render(<ProfAttendances />, document.getElementById("main"));
export default ProfAttendances;
