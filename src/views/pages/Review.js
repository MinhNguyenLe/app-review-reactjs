import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import ErrPage from "views/pages/Error.js";
import "moment-timezone";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Loading from "components/loading/Loading.js";
import * as func from "javascript/funcGlobal.js";
import * as rb from "react-bootstrap";

import ReviewNav from "components/Navbars/ReviewNav.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import Review from "components/review/Review.js";
import ReviewPageHeader from "components/Headers/ReviewPageHeader.js";

function ReviewPage() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (!arrIdSchool.includes(params.id)) history.push("/error");

    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const params = useParams();
  const history = useHistory();
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
  const state = useSelector((state) => state);
  const arrIdSchool = useSelector((state) => state.arrId.schools);

  const dispatch = useDispatch();

  const [listReview, setListReview] = useState([]);
  const [school, setSchool] = useState({});
  const [detailReview, setDetailReview] = useState({});

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [success, setSuccess] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const refresh = setInterval(() => {
      setSuccess(success + 1);
      console.log("in");
    }, 5000);
    Promise.all([axios.get(`${apiLocal}/api/schools/${params.id}/reviews`)])
      .then(([listReview]) => {
        console.log("runnnnnnnn");
        setListReview(listReview.data);
        setLoading(false);
      })
      .catch();
    return () => {
      console.log("out");
      clearInterval(refresh);
    };
  }, [success, params.id]);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/schools/${params.id}`)])
        .then(([school]) => {
          setSchool(school.data);
        })
        .catch();
      // .catch((err) => history.push("/error"));
    };
    axiosData();
  }, [params.id]);

  const editReview = (id, po, ne, ad) => {
    refPositive.current.value = po;
    refNegative.current.value = ne;
    refAdvice.current.value = ad;
    setShowEdit(true);
    func.scrollTop();
    dispatch(action.setIdReview(id));
    func.disableScrolling();
  };
  const saveEdit = async () => {
    $(`#icon_loading_2`).removeClass("hidden");
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
    func.enableScrolling();
    $(`#icon_loading_2`).addClass("hidden");
  };
  const deleteReview = (id) => {
    $(`#icon_loading_${id}`).removeClass("hidden");
    Promise.all([axios.delete(`${apiLocal}/api/reviews/${id}`)])
      .then(() => {
        setSuccess(success + 1);
        $(`#icon_loading_${id}`).addClass("hidden");
      })
      .catch(() => {});
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
    $(`#icon_loading_1`).removeClass("hidden");
    dispatch(
      action.setReview(
        refPositive.current.value,
        refNegative.current.value,
        refAdvice.current.value
      )
    );
    if (user.id) {
      await axios.post(`${apiLocal}/api/reviews/auth`, {
        idSchool: params.id,
        idUser: user.id,
        positive: refNewPositive.current.value,
        negative: refNewNegative.current.value,
        advice: refNewAdvice.current.value,
        ratePoint: refPointForSchool.current.value,
      });
    } else {
      await axios.post(`${apiLocal}/api/reviews/anonymous`, {
        idSchool: params.id,
        positive: refNewPositive.current.value,
        negative: refNewNegative.current.value,
        advice: refNewAdvice.current.value,
        ratePoint: refPointForSchool.current.value,
      });
    }
    setSuccess(success + 1);
    setShowWriteReview(false);
    func.enableScrolling();
    $(`#icon_loading_1`).addClass("hidden");
  };
  return (
    <>
      <div
        className={`${!showWriteReview ? "hidden" : "cover-background"}`}
      ></div>
      <div className={`${!showEdit ? "hidden" : "cover-background"}`}></div>
      <ReviewNav writeReview={writeReview} />
      <div className="wrapper">
        <ReviewPageHeader school={school} />
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
              <div className="up-page" onClick={() => func.scrollTop()}>
                <i
                  style={{ fontSize: "22px", color: "#7878da" }}
                  className="fas fa-angle-double-up"
                ></i>
              </div>
              <div
                style={!showEdit ? { display: "none" } : {}}
                className="editor"
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="big-title">Editor</span>
                  <i
                    onClick={exitEdit}
                    className="fas fa-times"
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Ưu điểm
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refPositive}
                      className="edit-content"
                    />
                  </div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Điểm cần cải thiện
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refNegative}
                      className="edit-content"
                    />
                  </div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Trải nghiệm và lời khuyên
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refAdvice}
                      className="edit-content"
                    />
                  </div>
                  <rb.Button onClick={saveEdit}>
                    Save{" "}
                    <i
                      id="icon_loading_2"
                      className="hidden now-ui-icons loader_refresh spin"
                    ></i>
                  </rb.Button>
                </div>
              </div>
              <div
                style={!showWriteReview ? { display: "none" } : {}}
                className="editor"
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="big-title">Write new review</span>
                  <i
                    onClick={exitWriteReview}
                    className="fas fa-times"
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <div>
                  <div>
                    <rb.Card.Text className="review-title">Điểm</rb.Card.Text>
                    <input
                      type="number"
                      ref={refPointForSchool}
                      className="edit-content"
                    />
                  </div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Ưu điểm
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refNewPositive}
                      className="edit-content"
                    />
                  </div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Điểm cần cải thiện
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refNewNegative}
                      className="edit-content"
                    />
                  </div>
                  <div>
                    <rb.Card.Text className="review-title">
                      Trải nghiệm và lời khuyên
                    </rb.Card.Text>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      ref={refNewAdvice}
                      className="edit-content"
                    />
                  </div>
                  <rb.Button onClick={saveAddReview}>
                    Save{" "}
                    <i
                      id="icon_loading_1"
                      className="hidden now-ui-icons loader_refresh spin"
                    ></i>
                  </rb.Button>
                </div>
              </div>
              {listReview.map((item, index) => (
                <div key={item._id}>
                  <Review
                    item={item}
                    name={item.idUser ? item.idUser.name : "Anonymous"}
                    editReview={editReview}
                    deleteReview={deleteReview}
                  ></Review>
                </div>
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
