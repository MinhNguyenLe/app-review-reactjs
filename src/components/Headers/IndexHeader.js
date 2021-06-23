/*eslint-disable*/
import React, { useRef } from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  // let pageHeader = useRef();

  // React.useEffect(() => {
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
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/header.jpg").default + ")",
          }}
          // ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/now-logo.png").default}
            ></img>
            <h1 className="h1-seo">App Review School.</h1>
            <h3>Create by team 4.</h3>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
