import React from "react";
import { Container } from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Navbar = () => {
  <React.Fragment>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  </React.Fragment>;
};

export { Navbar };
