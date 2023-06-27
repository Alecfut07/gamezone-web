import React from "react-bootstrap";
// import Header from "../../components/Header";
// import NavbarRouter from "../../components/NavbarRouter";
import Body from "../../components/Body";
import Footer from "../../components/Footer";

import "./Layout.css";

function Layout() {
  return (
    <>
      {/* <Header /> */}
      {/* <NavbarRouter>
        <Body />
      </NavbarRouter> */}
      <div className="body">
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
