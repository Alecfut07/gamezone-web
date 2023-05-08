import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";

import { UsersService } from "../services/UsersService";

const CustomNavbar = () => {
  const title = "GameZone";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("access_token");
      const user = await UsersService.getProfile(accessToken);
      setLoggedInUser(user);
      setLoggedIn(accessToken != null);
    })();
  }, []);

  // console.log(result);
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
                <NavDropdown
                  title={loggedInUser ? loggedInUser.email : ""}
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item href="/users/profile">
                    Your profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => localStorage.removeItem("access_token")}
                  >
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
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
