import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
  Image,
} from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import Cart from "./Cart/Cart";
import UsersService from "../services/UsersService";
import AuthService from "../services/AuthService";
import CartsService from "../services/CartsService";
import { AuthContext, CartContext } from "../context";
import Sidebar from "./Sidebar/Sidebar";
import GameZoneLogo from "../imgs/logos/gamezone_logo.png";

function CustomNavbar() {
  const [loggedInUser, setLoggedInUser] = useState();

  const navigateSignInPage = useNavigate();

  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const { setCartTotal } = useContext(CartContext);

  const signOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    signOut();
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
    (async () => {
      // const productQuantity = localStorage.getItem("ProductQuantity");
      try {
        const { products } = await CartsService.getCart();
        const totalQuantity = products.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        setCartTotal(totalQuantity);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    getProfile();
  }, [isLoggedIn]);

  console.log(loggedInUser);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Sidebar />
        <Navbar.Brand as={NavLink} to="/">
          <Image
            className="mx-4"
            src={`${GameZoneLogo}`}
            style={{ width: "120px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBar />
          {isLoggedIn ? (
            <Stack direction="horizontal" gap={3}>
              <NavDropdown
                className="ms-5"
                title={loggedInUser ? loggedInUser.email : ""}
                id="user-nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/users/profile" /* href="/users/profile" */
                >
                  Your profile
                </NavDropdown.Item>
                {loggedInUser.is_admin && (
                  <NavDropdown.Item as={Link} to="/admin/categories">
                    Categories
                  </NavDropdown.Item>
                )}
                {loggedInUser.is_admin && (
                  <NavDropdown.Item as={Link} to="/admin/products">
                    Products
                  </NavDropdown.Item>
                )}
                {loggedInUser.is_admin && (
                  <NavDropdown.Item as={Link} to="/admin/conditions">
                    Conditions
                  </NavDropdown.Item>
                )}
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
              <Button
                // className="ms-auto"
                variant="outline-dark"
                href="/users/sign_up"
              >
                Sign up
              </Button>
            </Stack>
          )}
        </Navbar.Collapse>
        <Nav /* className="ms-5" */ style={{ marginRight: "15px" }}>
          <Nav.Link as={NavLink} to="/cart">
            <div>
              <Cart />
            </div>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
