import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiConsoleController } from "react-icons/gi";
import SearchBar from "./SearchBar";

import UsersService from "../services/UsersService";

function CustomNavbar() {
  const title = "GameZone";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const logoStyle = useMemo(() => ({ color: "red", size: "50px" }), []);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        if (accessToken !== null) {
          const user = await UsersService.getProfile(accessToken);
          setLoggedInUser(user);
          setLoggedIn(true);
        }
      } catch (error) {
        // TODO
        setLoggedIn(false);
      }
    })();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <IconContext.Provider value={logoStyle}>
            <GiConsoleController className="mx-4" />
          </IconContext.Provider>
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/conditions">
              Conditions
            </Nav.Link>
          </Nav>
          <SearchBar />
          {isLoggedIn ? (
            <Stack direction="horizontal" gap={3}>
              <NavDropdown
                className="ms-5"
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
            </Stack>
          ) : (
            <Stack className="mt-auto" direction="horizontal" gap={3}>
              <Button
                className="ms-5"
                variant="outline-dark"
                href="/users/sign_in"
              >
                Sign in
              </Button>
              <Button variant="outline-dark" href="/users/sign_up">
                Sign up
              </Button>
            </Stack>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
