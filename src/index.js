import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

import { Provider } from "react-redux";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <HomePage />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
