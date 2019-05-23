import React from 'react';
import ReactDOM from "react-dom";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import SubjectSchedule from "../Components/Schedules/subjectSchedule.jsx";
import Navigator from "../Components/Navigator.jsx"

class StudentSubjectsSchedule extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  render() {
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Schedule"), href: "" }];
    return (
      <div>
        <Navigator />
        <WebCrumbs pages={pages} />
        <SubjectSchedule />

      </div>
    );
  }
}

ReactDOM.render(<StudentSubjectsSchedule />, document.getElementById("main"));
export default StudentSubjectsSchedule;
