import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../Components/Navigator.jsx";
import ViewProfile from "../Components/ViewProfile.jsx";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
        <div>
            <Navbar />
            <ViewProfile />
        </div>
    );
  }
}

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
