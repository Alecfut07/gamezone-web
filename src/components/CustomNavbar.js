import React, { useEffect, useMemo, useState, useContext } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiConsoleController } from "react-icons/gi";
import SearchBar from "./SearchBar";
import Cart from "./Cart/Cart";
import UsersService from "../services/UsersService";
import { AuthContext } from "./Auth";
import Sidebar from "./Sidebar/Sidebar";

function CustomNavbar() {
  const title = "GameZone";
  const [loggedInUser, setLoggedInUser] = useState();
  const logoStyle = useMemo(() => ({ color: "red", size: "50px" }), []);
  const [cartTotal, setCartTotal] = useState("");

  const navigateSignInPage = useNavigate();

  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    navigateSignInPage("/users/sign_in");
  };

  const getProfile = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      if (accessToken !== null) {
        const user = await UsersService.getProfile(accessToken);
        setLoggedInUser(user);
        setLoggedIn(true);
      }
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    (() => {
      const productQuantity = localStorage.getItem("ProductQuantity");
      setCartTotal(productQuantity);
    })();
  }, []);

  useEffect(() => {
    getProfile();
  }, [isLoggedIn]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Sidebar />
        <Navbar.Brand as={NavLink} to="/">
          <IconContext.Provider value={logoStyle}>
            <GiConsoleController className="mx-4" />
          </IconContext.Provider>
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/admin/categories">
              Categories
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
                <NavDropdown.Item onClick={() => handleSignOut()}>
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
        <Nav className="ms-5">
          <Nav.Link as={NavLink} to="/cart">
            <div>
              <Cart amount={cartTotal} />
            </div>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
