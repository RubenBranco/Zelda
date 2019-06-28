import React from 'react';
import ReactDOM from "react-dom";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";
import ViewCurricularUnitData from "../Components/ViewCurricularUnitData.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class SubjectInfo extends React.Component {
  constructor() {
    super();

  }

  render() {
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Information"), href: "" }];
    return (
      <div>
        <Navigator />
        <MenuStudLateral />
        <div class="resto-pagina2">
          <WebCrumbs pages={pages} />
          <h2 class="title_main_menu">{gettext("Subject Information")}</h2>
          <div className="menu2">
            <ViewCurricularUnitData />
          </div>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<SubjectInfo />, document.getElementById("main"));
export default SubjectInfo;
