import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import "./index.css";
import Index from "./views/Index.js";
import ErrPage from "./views/pages/Error.js";
import Schools from "./views/pages/Schools.js";
import MyPage from "./views/pages/MyPage.js";
import DetailReview from "./views/pages/DetailReview.js";
import ReviewPage from "./views/pages/Review.js";
import Register from "./views/pages/Register.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/pages/LoginPage.js";
import LandingPage from "./views/pages/LandingPage.js";
import ProfilePage from "./views/pages/ProfilePage.js";
import Navbars from "./views/index-sections/Navbars.js";

import { apiLocal } from "./javascript/dataGlobal.js";
import axios from "axios";
import * as action from "./redux/actions.js";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/nav" render={(props) => <Navbars {...props} />} />
        <Route
          exact
          path="/reviews/:id/detail"
          render={(props) => <DetailReview {...props} />}
        />
        <Route exact path="/mypage" render={(props) => <MyPage {...props} />} />
        <Route
          exact
          path="/schools/:id/reviews"
          render={(props) => <ReviewPage {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Route
          exact
          path="/schools"
          render={(props) => <Schools {...props} />}
        />
        <Route exact path="/" render={(props) => <Index {...props} />} />
        <Route
          exact
          path="/icon"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          exact
          path="/landing"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          exact
          path="/profile/:id"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <LoginPage {...props} />}
        />
        <Route component={ErrPage}></Route>
      </Switch>
    </>
  );
};

export default App;
