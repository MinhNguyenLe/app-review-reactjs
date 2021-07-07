import React, { useRef, useEffect } from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function SchoolPageHeader() {
  // let pageHeader = useRef();

  // useEffect(() => {
  //   if (window.innerWidth > 991 && pageHeader.current) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg6.jpg").default + ")",
          }}
          // ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Danh sách các trường tại Việt </h1>
          </Container>
        </div>
      </div>
    </>
  );
}

export default SchoolPageHeader;
