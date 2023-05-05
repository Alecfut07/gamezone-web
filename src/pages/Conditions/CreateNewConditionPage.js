import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { ConditionsService } from "../../services/ConditionsService";
import { useNavigate } from "react-router-dom";

import "./CreateNewCondition.css";

const CreateNewConditionPage = () => {
  const [validated, setValidated] = useState(false);

  const navigateConditions = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      sendNewCondition();
      navigateConditions("/admin/conditions");
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [state, setState] = useState("");

  const sendNewCondition = async () => {
    try {
      const result = await ConditionsService.createNewCondition(state);
    } catch (error) {
      setState(null);
    }
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
};

export { CreateNewConditionPage };
