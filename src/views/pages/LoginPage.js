import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import useFormLogin from "../../javascript/useFormLogin";
import validateLogin from "../../javascript/validateLogin";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions.js";
import { apiLocal } from "../../javascript/dataGlobal.js";

// import LoginImg from "../../assets/img/login.jpg"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

function LoginPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const errLogin = useSelector((state) => state.errLogin);

  const { valuesLogin, errorsLogin, handleChangeLogin, handleSubmitLogin } =
    useFormLogin(login, validateLogin);
  function login() {
    Promise.all([
      axios.post(`${apiLocal}/api/users/login`, {
        email: valuesLogin.emailLogin,
        password: valuesLogin.passLogin,
      }),
    ])
      .then((res) => {
        dispatch(action.setErrLogin(false));
        dispatch(action.setToken(true));
        dispatch(action.setEmail(valuesLogin.emailLogin));
        history.push("/schools");
      })
      .catch((e) => {
        if (e.response.status === 400) dispatch(action.setErrLogin(true));
      });
  }

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <div
        data-testid="test-login"
        className="page-header clear-filter"
        filter-color="blue"
      >
        {
          //   <div
          //     className="page-header-image"
          //     style={{
          //       backgroundImage:
          //         "url(" + LoginImg + ")",
          //     }}
          //   ></div>
        }
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form
                  onSubmit={handleSubmitLogin}
                  action="submit"
                  className="form"
                  method=""
                >
                  <CardHeader className="text-center">
                    {
                      //   <div className="logo-container">
                      //   <img
                      //     alt="..."
                      //     src={require("assets/img/now-logo.png").default}
                      //   ></img>
                      // </div>
                    }
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={valuesLogin.emailLogin || ""}
                        name="emailLogin"
                        id="emailLogin"
                        required
                        onChange={handleChangeLogin}
                        placeholder="Địa chỉ email..."
                        type="email"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    {errorsLogin.emailLogin && (
                      <p className="help is-danger">{errorsLogin.emailLogin}</p>
                    )}
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={valuesLogin.passLogin || ""}
                        name="passLogin"
                        id="passLogin"
                        required
                        onChange={handleChangeLogin}
                        placeholder="Mật khẩu..."
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    {errorsLogin.passLogin && (
                      <p id="err-validate" className="help is-danger">{errorsLogin.passLogin}</p>
                    )}
                    {errLogin && (
                      <p id="err-call-api-login" className="help is-danger">
                        Tài khoản sai hoặc không tồn tại
                      </p>
                    )}
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      data-testid="test-btn-login"
                      id="test-btn-login"
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                    >
                      Đăng nhập
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link className="link" to="/register">
                          Đăng ký tài khoản
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <Link className="link" to="/">
                          Đăng nhập ẩn danh
                        </Link>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
