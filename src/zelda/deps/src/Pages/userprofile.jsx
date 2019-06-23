import React from "react";
import ReactDOM from "react-dom";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";

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
        
        <MenuProfLateral />
        <div class="resto-pagina2">
        <WebCrumbs pages={pages} />
          <ViewProfile />
        </div>
      </div >
    );
  }
}

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
