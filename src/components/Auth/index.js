/* eslint-disable */
import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
