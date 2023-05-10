import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

import "./SignInPage.css";

function SignInPage() {
  const [validated, setValidated] = useState(false);
  const [hasErrors, setHasError] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateHomePage = useNavigate();

  const signIn = async (userEmail, userPassword) => {
    try {
      const accessToken = await AuthService.signIn(userEmail, userPassword);
      localStorage.setItem("access_token", accessToken);
      navigateHomePage("/home");
      navigateHomePage(0);
      setHasError(true);
    } catch (error) {
      setEmail(null);
      setPassword(null);
      setHasError(false);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      signIn(email, password);
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Form
        className="p-3 my-5 d-flex flex-column w-50"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-4" controlId="emailValidation">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={onEmailChange}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="passwordValidation">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={onPasswordChange}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is incorrect.
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group
          className="d-flex justify-content-between mx-3 mb-4"
          controlId="formBasicCheckbox"
        >
          <Form.Check type="checkbox" label="Remember me" />
          <a href="!#">Forgot password?</a>
        </Form.Group> */}
        <Button className="mb-4" variant="primary" type="submit">
          SIGN IN
        </Button>
        <div className="text-center">
          <p>
            Not a member? <a href="/users/sign_up">Register</a>
          </p>
        </div>
      </Form>
      {validated && hasErrors && (
        <Alert variant="danger">Something went wrong!</Alert>
      )}
    </Container>
  );
}

export default SignInPage;
