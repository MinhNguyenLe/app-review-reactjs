import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Review from "components/review/Review";
import * as rb from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import * as func from "javascript/funcGlobal.js";
import UpLoadImg from "components/input/UploadImg";

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import CustomNavbar from "components/Navbars/CustomNavbar.js";
import MypageHeader from "components/Headers/MypageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function MyPage() {
  const [upAvatar, setUpAvatar] = useState(null);
  const refAvatar = useRef(null);

  const [upCoverImg, setUpCoverImg] = useState(null);
  const refCoverImg = useRef(null);

  const [re, setRe] = useState(0);
  const [cmt, setCmt] = useState(0);

  const params = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const userRedux = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  const [pills, setPills] = React.useState("2");

  React.useEffect(() => {
    if (!userRedux.id) history.push("/login");

    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const refPositive = useRef();
  const refNegative = useRef();
  const refAdvice = useRef();

  const idSchool = useSelector((state) => state.idSchool);
  const idReview = useSelector((state) => state.idReview);

  const [success, setSuccess] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`${apiLocal}/api/comments/users/${user.id}`),
        axios.get(`${apiLocal}/api/reviews/users/${user.id}`),
      ])
        .then(([cmt, re]) => {
          $(`#loading_1_${user.id}`).addClass("hidden");
          $(`#loading_2_${user.id}`).addClass("hidden");
          // if(!re.data.length && success === 0) $(".text-after-loading-re").prepend( `<h2 className="one">0</h2>` )
          // if(!cmt.data.length && success === 0) $(".text-after-loading-cmt").prepend( `<h2 className="one">0</h2>` )
          setRe(re.data);
          setCmt(cmt.data);
        })
        .catch();
      // .catch((err) => history.push("/error"));
    };
    axiosData();
  }, [success]);

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
    $(`#icon_loading_4`).removeClass("hidden");
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
    $(`#icon_loading_4`).addClass("hidden");
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

  const saveChangeUser = () => {
    if (refAvatar.current.files[0]) {
      $("#icon_loading_avatar").removeClass("hidden");
      let formData = new FormData();
      formData.append("avatar", refAvatar.current.files[0]);
      formData.append("id", user.id);
      Promise.all([
        axios.patch(`${apiLocal}/api/users/avatar`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
      ])
        .then(() => {
          updateUser();
        })
        .catch();
    }
    if (refCoverImg.current.files[0]) {
      $("#icon_loading_avatar").removeClass("hidden");
      let formData = new FormData();
      formData.append("coverImg", refCoverImg.current.files[0]);
      formData.append("id", user.id);
      Promise.all([
        axios.patch(`${apiLocal}/api/users/cover-img`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
      ])
        .then(() => {
          updateUser();
        })
        .catch();
    } else console.log("nooooooooooooo");
  };
  const updateUser = async () => {
    Promise.all([axios.get(`${apiLocal}/api/users/${user.id}`)]).then(
      ([newUser]) => {
        dispatch(action.setUser(newUser.data));
        $("#icon_loading_avatar").addClass("hidden");
      }
    );
  };
  return (
    <>
      <div className={`${!showEdit ? "hidden" : "cover-background"}`}></div>
      <div
        style={!showEdit ? { display: "none" } : {}}
        className="editor-mypage"
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
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
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
            Lưu{" "}
            <i
              style={{ margin: "0 8px" }}
              id="icon_loading_4"
              className="hidden now-ui-icons loader_refresh spin"
            ></i>
          </rb.Button>
        </div>
      </div>
      <CustomNavbar />
      <div className="wrapper">
        <MypageHeader re={re} cmt={cmt} />
        <div className="section">
          <Container>
            <div className="button-container d-flex justify-content-center">
              <Button
                color="warning"
                onClick={() => saveChangeUser()}
                style={{ margin: "26px" }}
              >
                Lưu{" "}
                <i
                  id="icon_loading_avatar"
                  className="hidden now-ui-icons loader_refresh spin"
                ></i>
              </Button>
              <UpLoadImg
                upAvatar={upAvatar}
                setUpAvatar={setUpAvatar}
                refAvatar={refAvatar}
                content="Add avatar"
              ></UpLoadImg>
              <UpLoadImg
                upAvatar={upCoverImg}
                setUpAvatar={setUpCoverImg}
                refAvatar={refCoverImg}
                content="Add cover image"
              ></UpLoadImg>
            </div>
            {re &&
              re.map((item) => {
                return (
                  <Review
                    key={`key_user_${item._id}`}
                    editReview={editReview}
                    deleteReview={deleteReview}
                    item={item}
                    name={user.name}
                    typePage="mypage"
                  ></Review>
                );
              })}
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default MyPage;
