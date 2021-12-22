import React, { useRef, useEffect } from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function ReviewPageHeader({ school }) {
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={
            school.images
              ? {
                  backgroundImage: "url(" + school.images[0] + ")",
                }
              : {
                  backgroundImage:
                    "url(" + require("assets/img/bg7.jpg").default + ")",
                }
          }
          // ref={pageHeader}
        ></div>
        <div
          className="content-center"
          style={{ background: "rgb(3 3 3 / 60%)" }}
        >
          <Container style={{ paddingBottom: "12px" }}>
            <h1 className="title">
              {school.name || <i className="now-ui-icons loader_gear spin"></i>}
            </h1>
            <a
              style={{ color: "white" }}
              href={school.website}
              className="small-title"
            >
              {school.website}
            </a>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ReviewPageHeader;
