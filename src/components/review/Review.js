import React from "react";
import Moment from "react-moment";
import Avatar from "components/avatar/Avatar.js";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Review({
  upVote,
  downVote,
  item,
  name,
  typePage,
  editReview,
  deleteReview,
}) {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [pills, setPills] = React.useState("1");
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        key={item._id}
        style={{
          width: "50%",
          margin: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "6px",
            marginBottom: "12px",
            borderBottom: "1px solid rgb(210 210 210)",
          }}
        >
          <Link
            to={
              typePage === "mypage"
                ? "/mypage"
                : typePage === "profile"
                ? `/profile/${params.id}`
                : `/profile/${item.idUser ? item.idUser._id : "err"}`
            }
            style={{ flex: "1.5" }}
            className="review-link-user"
          >
            <Avatar
              type="review"
              linkImg={item.idUser ? item.idUser.avatar : ""}
            ></Avatar>
            <div className="img-tab-review">
              <p style={{ margin: "0", fontWeight: "600", fontSize: "20px" }}>
                {name}
              </p>
              <Moment className="date-content" format="YYYY/MM/DD">
                {item.createdAt}
              </Moment>
            </div>
          </Link>
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-success"
              style={{
                marginRight: "4px",
                fontSize: "18px",
                padding: "8px 16px",
              }}
            >
              {item.ratePoint}
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "1",
              }}
            >
              <p style={{ margin: "0" }}>{item.comments} comments</p>
              <p
                className={`${typePage === "detail" ? "hidden" : ""}`}
                style={{
                  margin: "0",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.rateValue.up.idUser.length -
                  item.rateValue.down.idUser.length}{" "}
                <p style={{ fontSize: "13px", margin: "0px 0 0 2px" }}>
                  (voted)
                </p>
              </p>
            </div>
          </div>
          <div
            className="d-flex "
            style={{ flex: "1", justifyContent: "flex-end" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to={`/reviews/${item._id}/detail`}>
                <i className="now-ui-icons ui-1_zoom-bold"></i>
              </Link>
            </div>
            <div
              className={
                typePage !== "detail" &&
                user &&
                item.idUser &&
                user.id === item.idUser._id
                  ? ""
                  : "hidden"
              }
              onClick={() =>
                editReview(item._id, item.positive, item.negative, item.advice)
              }
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "8px",
              }}
            >
              <i className="now-ui-icons files_single-copy-04"></i>
            </div>
            <div
              className={
                typePage !== "detail" &&
                user &&
                item.idUser &&
                user.id === item.idUser._id
                  ? ""
                  : "hidden"
              }
              onClick={() => deleteReview(item._id)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "8px",
              }}
            >
              <i className="now-ui-icons design_scissors"></i>
            </div>
            <div>
              {" "}
              <i
                style={{ marginLeft: "8px" }}
                id={`icon_loading_${item._id}`}
                className="hidden now-ui-icons loader_refresh spin"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: "#2d4057",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              Ưu điểm
            </span>
            <p
              id={`${item._id}positive`}
              className={typePage !== "detail" ? "content-hidden" : ""}
            >
              {item.positive}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#2d4057",
                marginBottom: "12px",
                fontSize: "20px",
              }}
            >
              Nhược điểm
            </span>
            <p
              id={`${item._id}negative`}
              className={typePage !== "detail" ? "content-hidden" : ""}
            >
              {item.negative}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#2d4057",
                marginBottom: "12px",
                fontSize: "20px",
              }}
            >
              Lời khuyên
            </span>
            <p
              id={`${item._id}advice`}
              className={typePage !== "detail" ? "content-hidden" : ""}
            >
              {item.advice}
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid  rgb(210 210 210)" }}>
          {" "}
          <span
            id={`${item._id}more`}
            onClick={() => {
              $(`#${item._id}positive`).toggleClass("content-hidden");
              $(`#${item._id}negative`).toggleClass("content-hidden");
              $(`#${item._id}advice`).toggleClass("content-hidden");
              if ($(`#${item._id}more`).text() === "Xem hết") {
                $(`#${item._id}more`).text("Ẩn bớt");
              } else $(`#${item._id}more`).text("Xem hết");
            }}
          >
            Xem hết
          </span>
        </div>
      </div>
    </div>
  );
}

export default Review;
