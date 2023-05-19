import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function SuccessfulPurchasePage() {
  const navigateToHome = useNavigate();

  return (
    <Container>
      <h3>Thanks for your purchase!</h3>
      <Button onClick={() => navigateToHome("/")}>Back to store</Button>
    </Container>
  );
}

export default SuccessfulPurchasePage;
