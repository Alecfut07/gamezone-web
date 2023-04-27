import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const CustomNavbar = () => {
  const title = "GameZone";

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to={"/"}>
            <img
              alt=""
              src="/src/imgs/icons/gamezone_icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            {title}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/home"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/products"}>
                Products
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export { CustomNavbar };
