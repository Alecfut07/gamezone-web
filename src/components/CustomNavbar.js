import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const CustomNavbar = () => {
  const title = "GameZone";
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setLoggedIn(accessToken != null);
  }, []);

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
              <Nav.Link as={NavLink} to={"/admin/products"}>
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/admin/conditions"}>
                Conditions
              </Nav.Link>
            </Nav>
            <SearchBar />
            {isLoggedIn ? (
              <div>
                <Button
                  variant="outline-dark"
                  onClick={() => localStorage.removeItem("access_token")}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="outline-dark" href="/users/sign_in">
                  SignIn
                </Button>
                <Button variant="outline-dark" href="/users/sign_up">
                  SignUp
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export { CustomNavbar };
