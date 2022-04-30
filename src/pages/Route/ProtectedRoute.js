import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const user = useSelector((state) => state.user);

  console.log("user", user);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={otherProps.redirectTo ? otherProps.redirectTo : "/auth"}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
