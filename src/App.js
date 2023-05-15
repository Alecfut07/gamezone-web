import React from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import NavbarRouter from "./components/NavbarRouter";
import InitializeAxios from "./foundation";

InitializeAxios();

function App() {
  if (!Cookies.get("uuid")) {
    Cookies.set("uuid", uuidv4());
  }
  return <NavbarRouter />;
}

export default App;
