import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import * as func from "javascript/funcGlobal.js";
import Loading from "components/loading/Loading.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Avatar from "components/avatar/Avatar";

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

  const logOut = () => {
    Promise.all([axios.get(`${apiLocal}/api/users/logout`)])
      .then(() => {
        dispatch(action.setClear());
      })
      .catch(() => {});
  };

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
            <NavbarBrand
              style={{ fontSize: "18px" }}
              href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
              target="_blank"
              id="navbar-brand"
            >
              EduReview
            </NavbarBrand>
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
              {user.id ? (
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <NavItem>
                    <div>
                      <rb.Button onClick={writeReview}>Viết đánh giá</rb.Button>
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
                    <UncontrolledDropdown
                      className="button-dropdown"
                      style={{ marginLeft: "12px" }}
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
                        <DropdownItem header tag="a">
                          Dropdown header
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={(e) => logOut()}>
                          Logout
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Separated link
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          One more separated link
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavItem>
                </div>
              ) : (
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <NavItem>
                    <div>
                      <rb.Button onClick={writeReview}>Viết đánh giá</rb.Button>
                    </div>
                  </NavItem>
                  <NavItem>
                    <Button
                      href="/register"
                      className="nav-link btn-neutral"
                      color="info"
                      id="upgrade-to-pro"
                      target="_blank"
                    >
                      <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                      <p>Register</p>
                    </Button>
                  </NavItem>
                  <div>
                    <Button
                      href="/login"
                      className="nav-link btn-neutral"
                      color="info"
                    >
                      <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                      <p>Login</p>
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
