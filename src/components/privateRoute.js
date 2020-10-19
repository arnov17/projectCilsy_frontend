import React from "react";
import { Route, Redirect } from "react-router-dom";
import { storageData } from "../utils/global";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   window.location.reload();
  const isLoginAdmin = () => {
    if (storageData === null) {
      return false;
    } else if (storageData.level === "ADMIN") {
      return true;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoginAdmin() ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
};

export default PrivateRoute;
