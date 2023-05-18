import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./ProductsPage.css";

function ProductsWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default ProductsWrapper;
