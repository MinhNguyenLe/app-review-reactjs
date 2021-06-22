import React, { useRef } from "react";
import { useSelector } from "react-redux";
// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader({ re, cmt }) {
  const people = useSelector((state) => state.people);
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
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg5.jpg").default + ")",
          }}
          // ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img
              alt="..."
              src={
                people.avatar ||
                require("assets/img/default-avatar.png").default
              }
            ></img>
          </div>
          <h3 className="title">{people.name}</h3>
          <p className="category">{people.school || "No information"}</p>
          <div className="content">
            <div className="social-description">
              <i
                style={{ fontSize: "32px !important" }}
                id="icon_loading_re"
                className="hidden now-ui-icons loader_refresh spin"
              ></i>
              <h2>{re.length || "0"}</h2>
              <p>Reviews</p>
            </div>
            <div className="social-description">
              <i
                style={{ fontSize: "32px !important" }}
                id="icon_loading_cmt"
                className="hidden now-ui-icons loader_refresh spin"
              ></i>
              <h2>{cmt.length || "0"}</h2>
              <p>Comments</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
