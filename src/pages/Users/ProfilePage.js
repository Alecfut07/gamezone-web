import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import { AuthService } from "../../services/AuthService";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [validated, setValidated] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());

  const years = range(1800, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateProfilePage = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const user = await AuthService.getProfile(accessToken);
      setLoggedInUser(user);
      setLoggedIn(accessToken != null);
    })();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateProfile(accessToken, firstName, lastName, email, phone, birthdate);
      navigateProfilePage(0);
    }
    setValidated(true);
  };

  const updateProfile = async (
    accessToken,
    firstName,
    lastName,
    email,
    phone,
    birthdate
  ) => {
    try {
      await AuthService.updateProfile(
        accessToken,
        firstName,
        lastName,
        email,
        phone,
        birthdate
      );
    } catch (error) {
      setFirstName(null);
      setLastName(null);
      setEmail(null);
      setPhone(null);
      setBirthdate(null);
    }
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <Container>
      <h1>Profile Page</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="firstNameValidation">
            <Form.Label>
              <b>First Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={loggedInUser ? loggedInUser.first_name : ""}
              onChange={onFirstNameChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="lastNameValidation">
            <Form.Label>
              <b>Last Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={loggedInUser ? loggedInUser.last_name : ""}
              onChange={onLastNameChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="emailValidation">
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={loggedInUser ? loggedInUser.email : ""}
              onChange={onEmailChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="phoneValidation">
            <Form.Label>
              <b>Phone</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={loggedInUser ? loggedInUser.phone : ""}
              onChange={onPhoneChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="birthdateValidation">
            <Form.Label>
              <b>Birthdate</b>
            </Form.Label>
            <DatePicker
              utcOffset={0}
              dateFormat="MMMM d, yyyy"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={moment(birthdate).toDate()}
              onChange={(date, e) => setBirthdate(date, e)}
            />
          </Form.Group>
        </Row>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export { ProfilePage };
