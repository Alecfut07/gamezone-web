import React from "react";
import ReactDOM from "react-dom/client";
import { Container } from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { NavbarRouter } from "./components/NavbarRouter";
import { CustomNavbar } from "./components/CustomNavbar";
import { ProductsPage } from "./pages/ProductsPage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavbarRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
