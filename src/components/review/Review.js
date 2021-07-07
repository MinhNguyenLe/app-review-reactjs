import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Avatar from "components/avatar/Avatar.js";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { apiLocal } from "javascript/dataGlobal.js";
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
  success,
  setSuccess,
  item,
  name,
  typePage,
  editReview,
  deleteReview,
  writeReport,
}) {
  const params = useParams();
  const user = useSelector((state) => state.user);

  const upVote = (id) => {
    $(`#${item._id}icon_loading_detail-vote`).removeClass("hidden");
    $(`#${item._id}scores_id`).addClass("hidden");
    Promise.all([
      axios.patch(`${apiLocal}/api/reviews/${id}/upvote`, {
        id: user.id,
      }),
    ])
      .then(() => {
        setSuccess(success + 1);
        $(`#${item._id}icon_loading_detail-vote`).addClass("hidden");
        $(`#${item._id}scores_id`).removeClass("hidden");
      })
      .catch();
  };
  const downVote = (id) => {
    $(`#${item._id}scores_id`).addClass("hidden");
    $(`#${item._id}icon_loading_detail-vote`).removeClass("hidden");
    Promise.all([
      axios.patch(`${apiLocal}/api/reviews/${id}/downvote`, {
        id: user.id,
      }),
    ])
      .then(() => {
        setSuccess(success + 1);
        $(`#${item._id}icon_loading_detail-vote`).addClass("hidden");
        $(`#${item._id}scores_id`).removeClass("hidden");
      })
      .catch();
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginTop: "100px" }}>
          <div
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => upVote(item._id)}
              className={`btn-icon btn-round btn ${
                !user.id || user.banned
                  ? "btn-dark prevent-event"
                  : item.rateValue.up.idUser.includes(user.id)
                  ? "btn-success"
                  : "btn-info"
              }`}
            >
              <i className="now-ui-icons arrows-1_minimal-up"></i>
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                id={`${item._id}scores_id`}
                className={`${!user.id || user.banned ? "text-dark" : ""}`}
                style={{
                  margin: "0 10px",
                  fontSize: "27px",
                  fontWeight: "bold",
                  color: "#1beb11",
                }}
              >
                {item.rateValue.up.idUser.length -
                  item.rateValue.down.idUser.length}
              </p>
              <i
                style={{ margin: "0px", fontSize: "20px" }}
                id={`${item._id}icon_loading_detail-vote`}
                className="hidden now-ui-icons loader_refresh spin"
              ></i>
            </div>
            <button
              onClick={() => downVote(item._id)}
              className={`btn-icon btn-round ${
                !user.id || user.banned
                  ? "btn-dark prevent-event"
                  : item.rateValue.down.idUser.includes(user.id)
                  ? "btn-success"
                  : "btn-info"
              } btn`}
            >
              <i className="now-ui-icons arrows-1_minimal-down"></i>
            </button>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <p style={{ margin: "0" }}>{item.comments} bình luận</p>
          </div>
        </div>
      </div>
      <div
        key={item._id}
        style={{
          width: "50%",
          margin: "80px 80px 80px 20px",
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: "0", fontWeight: "600", fontSize: "20px" }}>
                  {name}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <i
                      className={`fas ${
                        item.ratePoint >= 2
                          ? "star-show fa-star"
                          : item.ratePoint === 1
                          ? "star-show fa-star-half-alt"
                          : "star-hide fa-star"
                      }`}
                    ></i>
                    <i
                      className={`fas ${
                        item.ratePoint >= 4
                          ? "star-show fa-star"
                          : item.ratePoint === 3
                          ? "star-show fa-star-half-alt"
                          : "star-hide fa-star"
                      }`}
                    ></i>
                    <i
                      className={`fas ${
                        item.ratePoint >= 6
                          ? "star-show fa-star"
                          : item.ratePoint === 5
                          ? "star-show fa-star-half-alt"
                          : "star-hide fa-star"
                      }`}
                    ></i>
                    <i
                      className={`fas ${
                        item.ratePoint >= 8
                          ? "star-show fa-star"
                          : item.ratePoint === 7
                          ? "star-show fa-star-half-alt"
                          : "star-hide fa-star"
                      }`}
                    ></i>
                    <i
                      className={`fas ${
                        item.ratePoint === 10
                          ? "star-show fa-star"
                          : item.ratePoint === 9
                          ? "star-show fa-star-half-alt"
                          : "star-hide fa-star"
                      }`}
                    ></i>
                  </div>
                </div>
                <Moment
                  style={{ marginLeft: "6px" }}
                  className="date-content"
                  format="YYYY/MM/DD"
                >
                  {item.createdAt}
                </Moment>
              </div>
            </div>
          </Link>
          <div className="d-flex " style={{ justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                onClick={() => writeReport(item._id)}
                style={{
                  color: "#029425",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                className={`fas fa-exclamation-triangle ${
                  user && item.idUser && user.id === item.idUser._id
                    ? "prevent-event"
                    : ""
                }`}
              ></i>
              <div
                style={{
                  backgroundColor: "#dadada",
                  width: "1px",
                  height: "50%",
                  margin: "0 12px",
                }}
              ></div>
              <Link to={`/reviews/${item._id}/detail`}>
                <i
                  style={{ fontSize: "18px", color: "#029425" }}
                  className="now-ui-icons ui-1_zoom-bold"
                ></i>
              </Link>
            </div>
            <div
              className={
                (user && user.permission) ||
                (typePage !== "detail" &&
                  user &&
                  item.idUser &&
                  user.id === item.idUser._id)
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
              <i
                className="now-ui-icons files_single-copy-04"
                style={{ fontSize: "18px" }}
              ></i>
            </div>
            <div
              className={
                (user && user.permission) ||
                (typePage !== "detail" &&
                  user &&
                  item.idUser &&
                  user.id === item.idUser._id)
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
              <i
                style={{ fontSize: "18px" }}
                className="now-ui-icons design_scissors"
              ></i>
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
            <p
              style={{
                color: "#2d4057",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              {typePage === "mypage" || typePage === "profile"
                ? item.idSchool.name
                : ""}
            </p>
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
