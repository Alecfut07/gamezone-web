import React, { useState, useMemo } from "react";

const AuthContext = React.createContext({
  isLoggedIn: undefined,
  setLoggedIn: undefined,
  loggedInUser: undefined,
  setLoggedInUser: undefined,
});

function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const authMemo = useMemo(
    () => ({ isLoggedIn, setLoggedIn, loggedInUser, setLoggedInUser }),
    [isLoggedIn, loggedInUser]
  );

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
