import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Review from "components/review/Review";
import Loading from "components/loading/Loading";
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

import ErrPage from "views/pages/Error.js";
import CustomNavbar from "components/Navbars/CustomNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function ProfilePage() {
  const [re, setRe] = useState(0);
  const [cmt, setCmt] = useState(0);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const people = useSelector((state) => state.people);
  const user = useSelector((state) => state.user);
  const arrIdUser = useSelector((state) => state.arrId.users);

  const [pills, setPills] = React.useState("2");

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;

    Promise.all([
      axios.get(`${apiLocal}/api/comments/users/${params.id}`),
      axios.get(`${apiLocal}/api/reviews/users/${params.id}`),
      axios.get(`${apiLocal}/api/users/${params.id}`),
    ])
      .then(([cmt, re, user]) => {
        $(`#loading_1_${params.id}`).addClass("hidden");
        $(`#loading_2_${params.id}`).addClass("hidden");
        if (!re.data.length)
          $(".text-after-loading-1-re").prepend("<h2>0</h2>");
        if (!cmt.data.length)
          $(".text-after-loading-1-cmt").prepend("<h2>0</h2>");
        setRe(re.data);
        setCmt(cmt.data);
        dispatch(action.setPeople(user.data));
        setLoading(false);
      })
      .catch((err) => {
        // history.push("/error");
      });
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const deleteUser = () => {
    Promise.all([
      axios.delete(`${apiLocal}/api/users/${params.id}`),
      axios.delete(`${apiLocal}/api/reviews/${params.id}/user`),
      axios.delete(`${apiLocal}/api/comments/${params.id}/user`),
    ])
      .then(() => {
        history.push("/");
        dispatch(action.setClear());
      })
      .catch();
  };
  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <ProfilePageHeader re={re} cmt={cmt} />
        <div className="section">
          <Container>
            <div className="button-container">
              <button
                className={`${
                  !(user && user.permission === 1 && people.permission === 0)
                    ? "btn btn-info"
                    : "btn btn-dark prevent-event"
                }`}
                style={{ margin: 0, height: "100%" }}
                color="info"
                size="lg"
                onClick={() => deleteUser()}
              >
                Chặn vĩnh viễn tài khoản
              </button>
            </div>
            <h3 className="title">About me</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5>
            {re &&
              re.map((item) => {
                return (
                  <Review
                    item={item}
                    typePage="profile"
                    name={item.idUser.name}
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

export default ProfilePage;
