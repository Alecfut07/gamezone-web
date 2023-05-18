import React from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import CustomNavbar from "./components/CustomNavbar";
import NavbarRouter from "./components/NavbarRouter";
import InitializeAxios from "./foundation";
import { AuthProvider } from "./components/Auth";

InitializeAxios();

function App() {
  if (!Cookies.get("uuid")) {
    Cookies.set("uuid", uuidv4());
  }
  return (
    <AuthProvider>
      <NavbarRouter>
        <CustomNavbar />
      </NavbarRouter>
    </AuthProvider>
  );
}

export default App;
