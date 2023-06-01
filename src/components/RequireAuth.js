import React, { useContext } from "react";
import { AuthContext } from "../context";
import HomePage from "../pages/Home";

function RequireAuth({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === false) {
    return <HomePage />;
  }
  return children;
}

export default RequireAuth;
