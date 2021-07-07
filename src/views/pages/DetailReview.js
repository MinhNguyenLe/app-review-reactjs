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
        <DetailPageHeader
          name={review.idUser && review.idUser.name}
          school={review.idSchool}
        />
        <div className="main">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Review
              success={success}
              setSuccess={setSuccess}
              typePage="detail"
              item={review}
              name={(review.idUser && review.idUser.name) || "Anonymous"}
            ></Review>
          </div>
          <ListComment success={success} setSuccess={setSuccess}></ListComment>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default DetailReview;
