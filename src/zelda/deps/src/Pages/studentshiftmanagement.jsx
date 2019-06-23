import React from 'react';
import ReactDOM from "react-dom";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ShiftDashboard from "../Components/Menus/ShiftDashboard.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class StudentShiftManagement extends React.Component {
    constructor() {
        super();

    }

    render() {
<<<<<<< HEAD
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Shift Management"), href: "" }];
=======
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Enroll / Unsubscribe in Shifts"), href: "" }];

>>>>>>> 9f73be4921b888a9732458bb39aa862a949cfb59
        return (

            <div>
                <Navigator />
                <WebCrumbs pages={pages} />
                <MenuStudLateral />
                <div class="resto-pagina2">
<<<<<<< HEAD
                <WebCrumbs pages={pages} />
                <ShiftDashboard />
=======
                    <ShiftDashboard />
>>>>>>> 9f73be4921b888a9732458bb39aa862a949cfb59
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StudentShiftManagement />, document.getElementById("main"));
export default StudentShiftManagement;
