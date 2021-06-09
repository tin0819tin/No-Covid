import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ConfirmDeliveryPage from "views/ConfirmDeliveryPage/ConfirmDeliveryPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import OrderPage from "views/OrderPage/OrderPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/confirm_delivery-page" component={ConfirmDeliveryPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/order-page" component={OrderPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
