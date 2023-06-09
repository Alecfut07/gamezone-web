import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

function PrivateRoute({ children }) {
  const { isLoggedIn, loggedInUser } = useContext(AuthContext);

  if (isLoggedIn === false) {
    return <Navigate to="/" />;
  }

  if (isLoggedIn && loggedInUser?.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
