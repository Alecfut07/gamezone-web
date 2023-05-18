import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function UsersWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default UsersWrapper;
