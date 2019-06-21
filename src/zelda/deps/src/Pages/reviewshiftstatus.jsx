import React from "react";
import ReactDOM from "react-dom";

import Navbar from "../Components/Navigator.jsx";


class ReviewShiftStatus extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        return (
            <div>
                <Navbar />
            </div>
        );
    }
}

ReactDOM.render(<ReviewShiftStatus />, document.getElementById("main"));
export default ReviewShiftStatus;

