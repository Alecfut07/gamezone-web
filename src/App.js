import React from "react";
import Cookies from "js-cookie";
import NavbarRouter from "./components/NavbarRouter";
import InitializeAxios from "./foundation";

InitializeAxios();

function App() {
  Cookies.set("name", "value");
  return <NavbarRouter />;
}

export default App;
