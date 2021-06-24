import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Loading from "components/loading/Loading.js";
import * as func from "javascript/funcGlobal.js";
import * as rb from "react-bootstrap";
import ListComment from "components/comments/ListComment";
// reactstrap components
// import {
// } from "reactstrap";
import ErrPage from "views/pages/Error.js";
import CustomNavbar from "components/Navbars/CustomNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import Review from "components/review/Review";
import DetailPageHeader from "components/Headers/DetailPageHeader.js";

function DetailReview() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (!arrIdReview.includes(params.id)) history.push("/error");

    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const user = useSelector((state) => state.user);
  const arrIdReview = useSelector((state) => state.arrId.reviews);

  const [success, setSuccess] = useState(0);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const refresh = setInterval(() => {
      setSuccess(success + 1);
      console.log("in");
    }, 5000);
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}`)])
        .then(([review]) => {
          setReview(review.data);
          setLoading(false);
        })
        .catch();
      // .catch(() => history.push("/error"));
    };
    axiosData();
    return () => {
      console.log("out");
      clearInterval(refresh);
    };
  }, [success]);

  const upVote = () => {
    $(`#icon_loading_detail-vote`).removeClass("hidden");
    $("#scores_id").addClass("hidden");
    Promise.all([
      axios.patch(`${apiLocal}/api/reviews/${params.id}/upvote`, {
        id: user.id,
      }),
    ])
      .then(() => {
        setSuccess(success + 1);
        $(`#icon_loading_detail-vote`).addClass("hidden");
        $("#scores_id").removeClass("hidden");
      })
      .catch();
  };
  const downVote = () => {
    $("#scores_id").addClass("hidden");
    $(`#icon_loading_detail-vote`).removeClass("hidden");
    Promise.all([
      axios.patch(`${apiLocal}/api/reviews/${params.id}/downvote`, {
        id: user.id,
      }),
    ])
      .then(() => {
        setSuccess(success + 1);
        $(`#icon_loading_detail-vote`).addClass("hidden");
        $("#scores_id").removeClass("hidden");
      })
      .catch();
  };
  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <DetailPageHeader name={review.idUser && review.idUser.name} />
        <div className="main">
          <Review
            upVote={upVote}
            downVote={downVote}
            typePage="detail"
            item={review}
            name={(review.idUser && review.idUser.name) || "Anonymous"}
          ></Review>
          <ListComment success={success} setSuccess={setSuccess}></ListComment>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default DetailReview;
