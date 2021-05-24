import React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
