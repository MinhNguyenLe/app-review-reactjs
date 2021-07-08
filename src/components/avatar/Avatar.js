import React from "react";
import imgDefault from "assets/img/default-avatar.png";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiLocal } from "javascript/dataGlobal.js";
import * as action from "redux/actions.js";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
const Avatar = ({ linkImg, type }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = () => {
    Promise.all([axios.get(`${apiLocal}/api/users/logout`)])
      .then(() => {
        history.push("/login");
        dispatch(action.setClear());
        localStorage.removeItem();
      })
      .catch(() => {});
  };
  return (
    <div style={{ display: "flex" }}>
      <Link to="/mypage" target="_blank" style={{ cursor: "pointer" }}>
        <img
          style={
            type === "review"
              ? { width: "44px", height: "44px" }
              : { width: "44px", height: "44px" }
          }
          alt="..."
          className="obj-fit rounded-circle img-fluid"
          src={linkImg ? linkImg : imgDefault}
        ></img>
      </Link>
    </div>
  );
};

export default Avatar;
