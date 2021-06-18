import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import useFormLogin from "javascript/useFormLogin";
import validateLogin from "javascript/validateLogin";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Loading from "components/loading/Loading.js";
import * as func from "javascript/funcGlobal.js";
import * as rb from "react-bootstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import Review from "components/review/Review.js";
import Tabs from "../index-sections/Tabs.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";

function ReviewPage() {
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
  });
  let params = useParams();

  const [loading, setLoading] = useState(true);

  const refPositive = useRef();
  const refNegative = useRef();
  const refAdvice = useRef();

  const refPointForSchool = useRef();

  const refNewPositive = useRef();
  const refNewNegative = useRef();
  const refNewAdvice = useRef();

  const idSchool = useSelector((state) => state.idSchool);
  const idReview = useSelector((state) => state.idReview);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [listReview, setListReview] = useState([]);
  const [school, setSchool] = useState({});
  const [detailReview, setDetailReview] = useState({});

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [success, setSuccess] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`${apiLocal}/api/schools/${params.id}`),
        axios.get(`${apiLocal}/api/schools/${params.id}/reviews`),
      ])
        .then(([school, listReview]) => {
          setSchool(school.data);
          setListReview(listReview.data);
          setLoading(false);
        })
        .catch();
    };
    axiosData();
  }, [success, params.id]);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${idReview}`)])
        .then(([dataDetailReview]) => {
          setDetailReview(dataDetailReview.data);
          refPositive.current.value = dataDetailReview.data.positive;
          refNegative.current.value = dataDetailReview.data.negative;
          refAdvice.current.value = dataDetailReview.data.advice;
        })
        .catch((err) => console.log(err));
    };
    axiosData();
  }, [showEdit]);

  const editReview = (id) => {
    setShowEdit(true);
    func.scrollTop();
    dispatch(action.setIdReview(id));
    func.disableScrolling();
  };
  const saveEdit = async () => {
    dispatch(
      action.setReview(
        refPositive.current.value,
        refNegative.current.value,
        refAdvice.current.value
      )
    );
    await axios.put(`${apiLocal}/api/reviews/${idReview}`, {
      positive: refPositive.current.value,
      negative: refNegative.current.value,
      advice: refAdvice.current.value,
    });
    setSuccess(success + 1);
    setShowEdit(false);
  };
  const exitEdit = () => {
    setShowEdit(false);
    func.enableScrolling();
  };
  const writeReview = () => {
    func.scrollTop();
    setShowWriteReview(true);
    func.disableScrolling();
  };
  const exitWriteReview = () => {
    setShowWriteReview(false);
    refNewPositive.current.value = "";
    refNewNegative.current.value = "";
    refNewAdvice.current.value = "";
    refPointForSchool.current.value = "";
    func.enableScrolling();
  };
  const saveAddReview = async () => {
    dispatch(
      action.setReview(
        refPositive.current.value,
        refNegative.current.value,
        refAdvice.current.value
      )
    );
    await axios.post(`${apiLocal}/api/reviews/anonymous`, {
      idSchool: params.id,
      name: user.name || "anonymous",
      positive: refNewPositive.current.value,
      negative: refNewNegative.current.value,
      advice: refNewAdvice.current.value,
      ratePoint: refPointForSchool.current.value,
    });
    setSuccess(success + 1);
    setShowWriteReview(false);
    func.enableScrolling();
  };
  const goDetailReview = (id, positive, negative, advice, name, createdAt) => {
    dispatch(
      action.setDetailReview(id, positive, negative, advice, name, createdAt)
    );
    func.scrollTop();
  };
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="main">
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "500px" }}
            >
              <Loading />
            </div>
          ) : (
            <>
              {listReview.map((item, index) => (
                <>
                  <Review
                    positive={item.positive}
                    negative={item.negative}
                    advice={item.advice}
                    createdAt={item.createdAt}
                    id={item._id}
                    name={item.name}
                    idSchool={item.idSchool}
                    ratePoint={item.ratePoint}
                  ></Review>
                </>
              ))}
            </>
          )}
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default ReviewPage;
