import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../Components/Navigator.jsx";
import ViewProfile from "../Components/ViewProfile.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    // var items = {
    //   Home = window.frontpageUrl;
    //   Profile = "atual"
    // };
    const items = [{ "Home": window.frontpageUrl }, { "Profile": "atual" }];
    return (
      <div>
        <Navbar />
        <WebCrumbs webcrumbs={items} />
        <ViewProfile />
      </div >
    );
  }
}

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
