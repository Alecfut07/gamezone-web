import React from "react";
import Container from "react-bootstrap/Container";
import { ConditionsTable } from "../components/ConditionsTable";

const ConditionsPage = () => {
  return (
    <Container>
      <ConditionsTable />
    </Container>
  );
};

export { ConditionsPage };
