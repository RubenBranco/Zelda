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
    const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Profile"), href: "" }];
    return (
      <div>
        <Navbar />
        <WebCrumbs pages={pages} />
        <ViewProfile />
      </div >
    );
  }
}

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
