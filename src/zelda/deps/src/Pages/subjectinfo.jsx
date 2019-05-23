import React from 'react';
import ReactDOM from "react-dom";
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
        <WebCrumbs pages={pages} />
        <ViewCurricularUnitData />

      </div>
    );
  }
}

ReactDOM.render(<SubjectInfo />, document.getElementById("main"));
export default SubjectInfo;
