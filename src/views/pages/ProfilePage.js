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

  const [success, setSuccess] = React.useState(0);

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
  }, [success]);
  const deleteUser = () => {
    $("#ban_loading").removeClass("hidden");
    if (!people.banned) {
      Promise.all([
        axios.patch(`${apiLocal}/api/users/banned`, {
          idUser: people.id,
          idAdmin: user.id,
        }),
      ])
        .then(() => {
          setSuccess(success + 1);
          $("#ban_loading").addClass("hidden");
        })
        .catch();
    } else {
      Promise.all([
        axios.patch(`${apiLocal}/api/users/unbanned`, {
          idUser: people.id,
          idAdmin: user.id,
        }),
      ])
        .then(() => {
          setSuccess(success + 1);
          $("#ban_loading").addClass("hidden");
        })
        .catch();
    }
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
                  user &&
                  user.permission === 1 &&
                  people.permission === 0 &&
                  !people.banned
                    ? "btn btn-warning"
                    : user &&
                      user.permission === 1 &&
                      people.permission === 0 &&
                      people.banned
                    ? "btn btn-info"
                    : "hidden"
                }`}
                style={{ margin: 0, height: "100%", fontSize: " 16px" }}
                color="info"
                size="lg"
                onClick={() => deleteUser()}
              >
                {people.banned ? "Bỏ chặn" : "Chặn"} tài khoản{" "}
                <i
                  id="ban_loading"
                  className="hidden now-ui-icons loader_refresh spin"
                ></i>
              </button>
            </div>
            {re &&
              re.map((item) => {
                return (
                  <Review
                    success={success}
                    setSuccess={setSuccess}
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
