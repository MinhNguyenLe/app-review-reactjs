import React from "react";
import ListSchools from "components/schools/ListSchools";
// reactstrap components
// import {
// } from "reactstrap";

import CustomNavbar from "components/Navbars/CustomNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

import Tabs from "../index-sections/Tabs.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";

function Schools() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="main">
          <ListSchools></ListSchools>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Schools;