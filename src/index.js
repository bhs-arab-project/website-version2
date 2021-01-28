/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "template/Index.js";
import NucleoIcons from "template/NucleoIcons.js";
import LoginPage from "auth/LoginPage";
import BabPage from "./user/murid/Bab-page";
import ProfilePage from "./user/murid/Profile-page";
import SignUp from "./auth/SignUpPage.js";
import DetailBab from "./user/murid/Bab-detail.js";
import Materi from "./user/murid/materi.js";
import NotFound from "components/NotFound/notFound";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />

        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />

        <Route path="/signup" render={(props) => <SignUp {...props} />} />

        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />

        <Route path="/bab" render={(props) => <BabPage {...props} />} />

        <Route
          path="/detail-bab"
          render={(props) => <DetailBab {...props} />}
        />

        <Route path="/materi" render={(props) => <Materi {...props} />} />

        <Route path="*" render={(props) => <NotFound {...props} />} />

        <Redirect to="/login-page" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
