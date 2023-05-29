import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function SubCategoryWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default SubCategoryWrapper;
