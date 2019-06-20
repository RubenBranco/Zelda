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
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Info"), href: "" }];
    return (
      <div>
        <Navigator />
        <MenuStudLateral />
        <WebCrumbs pages={pages} />
        <div class="menu2">
        <ViewCurricularUnitData />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<SubjectInfo />, document.getElementById("main"));
export default SubjectInfo;
