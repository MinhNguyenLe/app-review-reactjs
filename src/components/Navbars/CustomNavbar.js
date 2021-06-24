import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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

function CustomNavbar() {
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

  const logOut = () => {
    Promise.all([axios.get(`${apiLocal}/api/users/logout`)])
      .then(() => {
        dispatch(action.setClear());
        localStorage.removeItem();
        localStorage.removeItem('x-access-token');
        history.push("/login");
        window.location.reload();
      })
      .catch(() => {});
  };
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
            <Nav navbar style={{ alignItems: "center" }}>
              <button
                className="btn btn-primary"
                style={{ margin: "0 8px 0 0" }}
              >
                <Link to="/schools">Danh sách trường</Link>
              </button>
              {user.id ? (
                <>
                  <NavItem>
                    <Avatar linkImg={user.avatar} type="profile"></Avatar>
                  </NavItem>
                  <NavItem>
                    <UncontrolledDropdown
                      className="button-dropdown"
                      style={{ marginLeft: "12px" }}
                    >
                      <DropdownToggle
                        caret
                        className="bell"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdown"
                        tag="a"
                        onClick={(e) => e.preventDefault()}
                      >
                        <div className="notify false">
                          <i
                            style={{ fontSize: "24px" }}
                            className="fas fa-bell"
                          ></i>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu
                        style={{
                          maxHeight: "600px",
                          // overflowY: "scroll",
                          // overflowX: "hidden",
                        }}
                        aria-labelledby="navbarDropdown"
                        right
                      >
                        <DropdownItem href="#pablo" onClick={(e) => logOut()}>
                          <p
                            style={{
                              fontSize: "20px",
                              color: "#a7aaaf",
                            }}
                          >
                            Logout
                          </p>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem onClick={(e) => e.preventDefault()}>
                          <div>
                            <p>hihi</p>
                            <span>aaaa</span>
                          </div>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem onClick={(e) => e.preventDefault()}>
                          One more separated link
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavItem>
                </>
              ) : (
                <>
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
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
