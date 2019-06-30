import React from "react";
import ReactDOM from "react-dom";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ProfSearchStudentsSubjectGrades from "../Components/Searches/ProfSearchStudentsSubjectGrades.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class ProfCheckGrades extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("View Grades"), href: "" }];

        return (
            <div>
                <Navigator />
                <MenuProfLateral />
                <div className="resto-pagina2">
                    <WebCrumbs pages={pages} />
                    <ProfSearchStudentsSubjectGrades />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ProfCheckGrades />, document.getElementById("main"));
export default ProfCheckGrades;
