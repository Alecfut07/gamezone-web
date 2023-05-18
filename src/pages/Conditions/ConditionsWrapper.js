import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

import "./ConditionsPage.css";

function ConditionsWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default ConditionsWrapper;
