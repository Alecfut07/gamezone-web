import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function CategoriesWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default CategoriesWrapper;
