import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
  Image,
} from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import UsersService from "../../services/UsersService";
import AuthService from "../../services/AuthService";
import CartsService from "../../services/CartsService";
import { AuthContext, CartContext } from "../../context";
import Sidebar from "../Sidebar/Sidebar";
import GameZoneLogo from "../../imgs/logos/gamezone_logo.png";

import "./CustomNavbar.css";

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

  return (
    <Navbar bg="light" expand="lg">
      <Container className="navbar-container">
        <Row>
          <Col
            className="sidebar"
            xs={{ span: 2, order: 1 }}
            md={{ span: 1, order: 1 }}
            // lg={{ span: 1, order: 1 }}
          >
            <Sidebar />
          </Col>
          <Col
            xs={{ span: 4, order: 2 }}
            md={{ span: 3, order: 2 }}
            // lg={{ span: 2, order: 2 }}
          >
            <Navbar.Brand as={NavLink} to="/">
              <Image className="gamezone-logo" src={`${GameZoneLogo}`} />
            </Navbar.Brand>
          </Col>
          <Col
            className="searchbar"
            xs={{ span: 12, order: 5 }}
            md={{ span: 7, order: 3 }}
            // lg={{ span: 9, order: 3 }}
          >
            <SearchBar />
          </Col>
          {isLoggedIn ? (
            <Col
              xs={{ span: 2, order: 2 }}
              md={{ span: 1, order: 4 }}
              // lg={{ span: 4, order: 4 }}
            >
              <Stack direction="horizontal" gap={3}>
                <NavDropdown
                  // className="ms-5"
                  // title={loggedInUser ? loggedInUser.email : ""}
                  title={
                    loggedInUser ? <AiOutlineUser className="user-icon" /> : ""
                  }
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/users/profile">
                    Your profile
                  </NavDropdown.Item>
                  {loggedInUser?.is_admin && (
                    <NavDropdown.Item as={Link} to="/admin/categories">
                      Categories
                    </NavDropdown.Item>
                  )}
                  {loggedInUser?.is_admin && (
                    <NavDropdown.Item as={Link} to="/admin/products">
                      Products
                    </NavDropdown.Item>
                  )}
                  {loggedInUser?.is_admin && (
                    <NavDropdown.Item as={Link} to="/admin/conditions">
                      Conditions
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={() => handleSignOut()}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav style={{ marginRight: "30px" }}>
                  <Nav.Link as={NavLink} to="/cart">
                    <div>
                      <Cart />
                    </div>
                  </Nav.Link>
                </Nav>
              </Stack>
            </Col>
          ) : (
            <Col
              xs={{ span: 4, order: 3 }}
              md={{ span: 1, order: 4 }}
              // lg={{ span: 4, order: 3 }}
            >
              <Nav style={{ marginRight: "30px" }}>
                <Nav.Link as={NavLink} to="/cart">
                  <div>
                    <Cart />
                  </div>
                </Nav.Link>
              </Nav>
            </Col>
          )}
        </Row>
        {/* : (
              <Stack className="mt-auto" direction="horizontal" gap={3}>
                <Button
                  // className="ms-5"
                  className="sign-in-button"
                  variant="outline-dark"
                  href="/users/sign_in"
                >
                  Sign in
                </Button>
                <Button
                  // className="ms-auto"
                  className="sign-up-button"
                  variant="outline-dark"
                  href="/users/sign_up"
                >
                  Sign up
                </Button>
              </Stack>
            ) */}
        {/* <Nav style={{ marginRight: "30px" }}>
          <Nav.Link as={NavLink} to="/cart">
            <div>
              <Cart />
            </div>
          </Nav.Link>
        </Nav> */}
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
