import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions.js";
import * as func from "../../javascript/funcGlobal.js";
import Loading from "../loading/Loading.js";
import { apiLocal } from "../../javascript/dataGlobal.js";
import Avatar from "../avatar/Avatar";
import Logout from "../avatar/Logout";

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function ReviewNav({ writeReview }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const user = useSelector((state) => state.user);
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link to="/" style={{ fontSize: "18px" }} id="navbar-brand">
              EDUREVIEW
            </Link>
            <UncontrolledTooltip target="#navbar-brand">
              Let 's start now.
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <button
                className="btn btn-primary"
                style={{ marginRight: "8px" }}
              >
                <Link to="/schools">Danh sách trường</Link>
              </button>
              {user.id ? (
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <NavItem>
                    <div>
                      <rb.Button
                        className={`${user.banned ? "prevent-event dark" : ""}`}
                        onClick={writeReview}
                      >
                        Viết đánh giá
                      </rb.Button>
                    </div>
                  </NavItem>
                  <NavItem
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar linkImg={user.avatar} type="profile"></Avatar>
                    <Logout></Logout>
                  </NavItem>
                </div>
              ) : (
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <NavItem>
                    <div>
                      <rb.Button
                        className={`${user.banned ? "prevent-event dark" : ""}`}
                        onClick={writeReview}
                      >
                        Viết đánh giá
                      </rb.Button>
                    </div>
                  </NavItem>
                  <NavItem>
                    <Button
                      href="/register"
                      className="nav-link btn-neutral"
                      color="info"
                      id="upgrade-to-pro"
                    >
                      <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                      <p>Đăng ký</p>
                    </Button>
                  </NavItem>
                  <div>
                    <Button
                      id="test-login"
                      href="/login"
                      className="nav-link btn-neutral"
                      color="info"
                    >
                      <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                      <p>Đăng nhập</p>
                    </Button>
                  </div>
                </div>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ReviewNav;
