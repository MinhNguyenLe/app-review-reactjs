import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
// core components

function ProfilePageHeader({ re, cmt }) {
  const params = useParams();
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
          style={
            people.coverImg
              ? {
                  backgroundImage: "url(" + people.coverImg + ")",
                }
              : {
                  backgroundImage:
                    "url(" + require("assets/img/bg5.jpg").default + ")",
                }
          }
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
          <p className={`${people.banned ? "" : "hidden"}`}>
            Tài khoản đã bị chặn
          </p>
          <h3 className="title">{people.name}</h3>
          <div className="content">
            <div className="social-description text-after-loading-1-re">
              {re.length ? (
                <h2>{re.length}</h2>
              ) : (
                <i
                  id={`loading_1_${params.id}`}
                  style={{ fontSize: "32px !important" }}
                  className="now-ui-icons loader_refresh spin"
                ></i>
              )}
              <p>Số bài đánh giá</p>
            </div>
            <div className="social-description text-after-loading-1-cmt">
              {cmt.length ? (
                <h2>{cmt.length}</h2>
              ) : (
                <i
                  id={`loading_2_${params.id}`}
                  style={{ fontSize: "32px !important" }}
                  className="now-ui-icons loader_refresh spin"
                ></i>
              )}
              <p>Số lượt bình luận</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
