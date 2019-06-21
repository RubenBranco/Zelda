import React from 'react';
import ReactDOM from "react-dom";

import Navigator from "../Components/Navigator.jsx";


class SubjectSignup extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
            <div>
                <Navigator />
            </div>
      );
    }
}

  ReactDOM.render(<SubjectSignup />, document.getElementById("main"));
  export default SubjectSignup;
