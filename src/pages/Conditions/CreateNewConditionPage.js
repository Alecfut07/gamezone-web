import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Col, Form, Row } from "react-bootstrap";

import ConditionsService from "../../services/ConditionsService";

import "./CreateNewCondition.css";

function CreateNewConditionPage() {
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState("");

  const navigateConditions = useNavigate();

  const sendNewCondition = async () => {
    try {
      await ConditionsService.createNewCondition(state);
      navigateConditions("/admin/conditions");
      navigateConditions(0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      sendNewCondition();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onStateChange = (e) => {
    setState(e.target.value);
  };

  return (
    <Container>
      <h1>Create New Condition</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="stateValidation">
            <Form.Label>State</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="State"
              onChange={onStateChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default CreateNewConditionPage;
