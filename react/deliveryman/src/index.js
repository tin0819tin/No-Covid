import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import NoCovid from "views/NoCovid"

ReactDOM.render(
  <NoCovid/>,
  document.getElementById("root")
);
