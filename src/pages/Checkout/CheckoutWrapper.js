import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function CheckoutWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default CheckoutWrapper;
