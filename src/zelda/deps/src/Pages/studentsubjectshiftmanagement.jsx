import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SubjectShiftManagement from "../Components/SubjectShiftManagement.jsx";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';


class StudentSubjectShiftManagement extends React.Component {
    constructor() {
        super();
        let pathName = window.location.pathname.split("/");
        this.subjectId = pathName[pathName.length - 2];
    }

    render() {
        return (
            <div>
                <Navigator />
                <SubjectShiftManagement subjectId={this.subjectId} />
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

ReactDOM.render(<StudentSubjectShiftManagement />, document.getElementById("main"));
export default StudentSubjectShiftManagement;
