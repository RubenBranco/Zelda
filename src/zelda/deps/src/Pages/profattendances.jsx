import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentsAttendance from "../Components/Searches/SearchStudentsAttendance.jsx";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import LanguageSwitch from "../Components/LanguageSwitch.jsx"
class ProfAttendances extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        return (
            <div>

                <Navigator />
                <footer><LanguageSwitch /> </footer>
                <div id="navigation_Menu">
                    <a href="#">Menu</a> > <a> Consult Students Attendances</a>
                </div>
                <MenuProfLateral />
                <SearchStudentsAttendance />

            </div>
        );
    }
}

ReactDOM.render(<ProfAttendances />, document.getElementById("main"));
export default ProfAttendances;
