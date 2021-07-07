import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function DetailPageHeader({ name, school }) {
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
          <Container style={{ background: "rgb(3 3 3 / 60%)" }}>
            <Link to={`/schools/${school._id}/reviews`}>
              <h1
                className="title"
                style={{ padding: "20px 0", color: "white" }}
              >
                Bài đánh giá cho<br></br>
                {`${school.name || "Người dùng ẩn danh"}`}
              </h1>
            </Link>
          </Container>
        </div>
      </div>
    </>
  );
}

export default DetailPageHeader;
