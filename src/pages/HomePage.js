import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import Auth from "./Route/Auth";

import Signin from "./examples/Signin";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

import Users from "./all-customers";

import AdminUsers from "./all-admin-users";

import ApkEmail from "./Email/ApkEmail";
import CustomEmail from "./Email/CustomEmail";

import { useSelector } from "react-redux";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.user);

  const { isAuthenticated } = user;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(true);

  const user = useSelector((state) => state.user);

  const { isAuthenticated } = user;

  console.log("user", user);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
            </main>
          </>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default () => {
  return (
    <Auth>
      <Switch>
        <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
        <RouteWithSidebar exact path={Routes.Users.path} component={Users} />

        <RouteWithSidebar
          exact
          path={Routes.AdminUsers.path}
          component={AdminUsers}
        />

        <RouteWithSidebar
          exact
          path={Routes.customeEmail.path}
          component={CustomEmail}
        />
        <RouteWithSidebar
          exact
          path={Routes.ApkEmail.path}
          component={ApkEmail}
        />

        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </Auth>
  );
};
