import React from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiLocal } from "../../javascript/dataGlobal.js";
import * as action from "../../redux/actions.js";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
const Logout = ({ linkImg, type }) => {
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
      <UncontrolledDropdown
        className="button-dropdown"
        style={{ marginLeft: "12px", display: "flex", alignItems: "center" }}
      >
        <DropdownToggle
          caret
          data-toggle="dropdown"
          href="#pablo"
          id="navbarDropdown"
          tag="a"
          onClick={(e) => e.preventDefault()}
        >
          <span className="button-bar"></span>
          <span className="button-bar"></span>
          <span className="button-bar"></span>
        </DropdownToggle>
        <DropdownMenu aria-labelledby="navbarDropdown">
          <DropdownItem onClick={logOut}>Đăng xuất</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default Logout;
