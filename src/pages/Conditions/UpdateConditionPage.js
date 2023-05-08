import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Col, Form, Row } from "react-bootstrap";

import { ConditionsService } from "../../services/ConditionsService";

import "./UpdateCondition.css";

const UpdateConditionPage = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [state, setState] = useState("");

  const navigateConditions = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateCondition(id, state);
      navigateConditions("/admin/conditions");
    }
    setValidated(true);
  };

  const updateCondition = async (id, state) => {
    try {
      const result = await ConditionsService.updateCondition(id, state);
    } catch (error) {
      setState(null);
    }
  };

  useEffect(() => {
    (async () => {
      searchCondition(id);
    })();
  }, []);

  const searchCondition = async (id) => {
    try {
      const result = await ConditionsService.getConditionById(id);
      setState(result.state);
    } catch (error) {
      setState(null);
    }
  };

  const onStateChange = (e) => {
    setState(e.target.value);
  };

  return (
    <Container>
      <h1>Update Condition</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="stateValidation">
            <Form.Label>State</Form.Label>
            <Form.Control
              required
              type="text"
              value={state}
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

export default { UpdateConditionPage };
