import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { ErrorList } from "../../components/ErrorList";
import { AuthService } from "../../services/AuthService";

import "./SignUpPage.css";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);

  const navigateHomePage = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      signUp(email, password);
      navigateHomePage("/home");
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);
  };

  const signUp = async (email, password) => {
    try {
      const accessToken = await AuthService.signUp(email, password);
      localStorage.setItem("access_token", accessToken);
    } catch (error) {
      setEmail(null);
      setPassword(null);
    }
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
          SIGN UP
        </Button>
        <div className="text-center">
          <p>
            Already a member? <a href="/users/sign_in">Sign In</a>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export { SignUpPage };
