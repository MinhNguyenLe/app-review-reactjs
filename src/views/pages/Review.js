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
import { filterType, filterLevel, filterMajor } from "javascript/filter.js";

import ReviewNav from "components/Navbars/ReviewNav.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import Review from "components/review/Review.js";
import ReviewPageHeader from "components/Headers/ReviewPageHeader.js";

import { FormGroup, Label, Input } from "reactstrap";

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
  }, []);
  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const refPositive = useRef();
  const refNegative = useRef();
  const refAdvice = useRef();
  const refReport = useRef();

  const refPointForSchool = useRef();

  const refNewPositive = useRef();
  const refNewNegative = useRef();
  const refNewAdvice = useRef();

  const score = useSelector((state) => state.score);
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
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    Promise.all([axios.get(`${apiLocal}/api/schools/${params.id}/reviews`)])
      .then(([listReview]) => {
        setListReview(listReview.data);
        setLoading(false);
      })
      .catch();
  }, [success]);

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
  const roundingScore = (score) => {
    return Math.round(score * 10) / 10;
  };
  const exitReport = () => {
    refReport.current.value = "";
    setShowReport(false);
    func.enableScrolling();
  };
  const writeReport = (id) => {
    dispatch(action.setIdReview(id));
    func.scrollTop();
    setShowReport(true);
    func.disableScrolling();
  };
  const saveReport = async () => {
    $(`#icon_loading_report`).removeClass("hidden");
    await axios.post(`${apiLocal}/api/reviews/${idReview}/report`, {
      message: refReport.current.value,
    });
    setSuccess(success + 1);
    setShowReport(false);
    func.enableScrolling();
    refReport.current.value = "";
    $(`#icon_loading_report`).addClass("hidden");
  };
  return (
    <>
      <div
        className={`${!showWriteReview ? "hidden" : "cover-background"}`}
      ></div>
      <div className={`${!showEdit ? "hidden" : "cover-background"}`}></div>
      <div className={`${!showReport ? "hidden" : "cover-background"}`}></div>
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
                className="editor"
                style={!showReport ? { display: "none" } : {}}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #dbdbdb",
                  }}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <span className="big-title">Report</span>
                  <i
                    onClick={exitReport}
                    className="fas fa-times"
                    style={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                  ></i>
                </div>
                <div>
                  <TextareaAutosize
                    placeholder="Viết báo cáo tại đây"
                    minRows={4}
                    maxRows={8}
                    ref={refReport}
                    className="edit-content"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <rb.Button
                    style={{ fontSize: "17px", padding: "12px 40px" }}
                    onClick={saveReport}
                  >
                    Save{" "}
                    <i
                      id="icon_loading_report"
                      className="hidden now-ui-icons loader_refresh spin"
                    ></i>
                  </rb.Button>
                </div>
              </div>
              <div
                style={!showEdit ? { display: "none" } : {}}
                className="editor"
              >
                <div
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #dbdbdb",
                  }}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <span className="big-title">Editor</span>
                  <i
                    onClick={exitEdit}
                    className="fas fa-times"
                    style={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                  ></i>
                </div>
                <div>
                  <div style={{ margin: "12px 0" }}>
                    <span>Ưu điểm</span>
                    <TextareaAutosize
                      minRows={2}
                      maxRows={4}
                      ref={refPositive}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ margin: "12px 0" }}>
                    <span>Khuyết điểm</span>
                    <TextareaAutosize
                      minRows={2}
                      maxRows={4}
                      ref={refNegative}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ margin: "12px 0" }}>
                    <span>Trải nghiệm và lời khuyên</span>
                    <TextareaAutosize
                      minRows={2}
                      maxRows={4}
                      ref={refAdvice}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <rb.Button
                      style={{ fontSize: "17px", padding: "12px 40px" }}
                      onClick={saveEdit}
                    >
                      Save{" "}
                      <i
                        id="icon_loading_2"
                        className="hidden now-ui-icons loader_refresh spin"
                      ></i>
                    </rb.Button>
                  </div>
                </div>
              </div>
              <div
                style={!showWriteReview ? { display: "none" } : {}}
                className="editor"
              >
                <div
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #dbdbdb",
                  }}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <span className="big-title">Write new review</span>
                  <i
                    onClick={exitWriteReview}
                    className="fas fa-times"
                    style={{ cursor: "pointer", color: "blue" }}
                  ></i>
                </div>
                <div>
                  <div>
                    <input
                      placeholder="Điểm"
                      type="number"
                      ref={refPointForSchool}
                      className="edit-content"
                      onChange={(e) => {
                        if (e.target.value > 10 || e.target.value < 0)
                          $("#score").removeClass("hidden");
                        else $("#score").addClass("hidden");
                      }}
                    />
                    <span
                      className="hidden"
                      id="score"
                      style={{ color: "red" }}
                    >
                      Điểm số phải từ 0 đến 10
                    </span>
                  </div>
                  <div style={{ margin: "16px 0" }}>
                    <TextareaAutosize
                      placeholder="Ưu điểm"
                      minRows={2}
                      maxRows={4}
                      ref={refNewPositive}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ margin: "16px 0" }}>
                    <TextareaAutosize
                      placeholder="Điểm cần cải thiện"
                      minRows={2}
                      maxRows={4}
                      ref={refNewNegative}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ margin: "16px 0" }}>
                    <TextareaAutosize
                      placeholder="Trải nghiệm và lời khuyên"
                      minRows={2}
                      maxRows={4}
                      ref={refNewAdvice}
                      className="edit-content"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <rb.Button
                      onClick={saveAddReview}
                      style={{ fontSize: "16px", padding: "12px 40px" }}
                    >
                      Save{" "}
                      <i
                        id="icon_loading_1"
                        className="hidden now-ui-icons loader_refresh spin"
                      ></i>
                    </rb.Button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "80px 0",
                    width: "70%",
                  }}
                >
                  <div className="d-flex flex-row align-items-center">
                    <rb.Badge
                      variant="success"
                      className="d-flex justify-content-center align-items-center school-badge"
                    >
                      {roundingScore(score) || 0}
                    </rb.Badge>
                    <div>
                      <rb.Card.Text>
                        {school.review || 0} bài đánh giá
                      </rb.Card.Text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <p>Trường :</p>
                    <p> {filterType(school.typeOfSchool)}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Cấp bậc :</p>
                    <p> {filterLevel(school.level)}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Đào tạo chuyên ngành :</p>
                    <p> {filterMajor(school.major)}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Mã code :</p>
                    <p> {school.code}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Địa chỉ :</p>
                    <p> {school.location}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: school.description || "",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    margin: "0 20px",
                    fontSize: "16px",
                    padding: "12px 36px",
                  }}
                  className="btn btn-warning"
                >
                  Gần đây
                </button>
                <button
                  style={{
                    margin: "0 20px",
                    fontSize: "16px",
                    padding: "12px 36px",
                  }}
                  className="btn btn-warning"
                >
                  Vote cao
                </button>
                <button
                  style={{
                    margin: "0 20px",
                    fontSize: "16px",
                    padding: "12px 36px",
                  }}
                  className="btn btn-warning"
                >
                  Vote thấp
                </button>
              </div>
              {listReview.map((item, index) => (
                <div key={item._id}>
                  <Review
                    success={success}
                    setSuccess={setSuccess}
                    item={item}
                    name={item.idUser ? item.idUser.name : "Anonymous"}
                    editReview={editReview}
                    deleteReview={deleteReview}
                    writeReport={writeReport}
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
