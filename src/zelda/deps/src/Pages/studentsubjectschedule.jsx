import React from 'react';
import ReactDOM from "react-dom";

import SubjectSchedule from "../Components/Schedules/subjectSchedule.jsx";

class StudentSubjectsSchedule extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  render() {
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Schedule"), href: "" }];
    return (
      <div>
        <SubjectSchedule />
        <WebCrumbs pages={pages} />
      </div>
    );
  }
}

ReactDOM.render(<StudentSubjectsSchedule />, document.getElementById("main"));
export default StudentSubjectsSchedule;
