import React from 'react';
import ReactDOM from "react-dom";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentSubjectGrades from "../Components/Searches/SearchStudentSubjectGrades.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class StudentGrades extends React.Component {
  constructor() {
    super();

  }

  render() {
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Grades"), href: "" }];
    return (
      <div>
        <Navigator />
        <MenuStudLateral />
        <WebCrumbs pages={pages} />
        <div class="resto-pagina">
        <SearchStudentSubjectGrades />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<StudentGrades />, document.getElementById("main"));
export default StudentGrades;