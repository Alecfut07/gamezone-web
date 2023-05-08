import React from "react";
import Container from "react-bootstrap/Container";
import ConditionsTable from "../../components/ConditionsTable";

import "./ConditionsPage.css";

function ConditionsPage() {
  return (
    <Container>
      <ConditionsTable />
    </Container>
  );
}

export default ConditionsPage;
