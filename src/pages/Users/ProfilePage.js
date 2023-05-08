import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import UsersService from "../../services/UsersService";

import "./ProfilePage.css";

function ProfilePage() {
  const [validated, setValidated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const user = await UsersService.getProfile(accessToken);
      setLoggedInUser(user);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone);
      setBirthdate(user.birthdate);
    })();
  }, []);

  const updateProfile = async (
    userAccessToken,
    userFirstName,
    userLastName,
    userPhone,
    userBirthdate
  ) => {
    try {
      await UsersService.updateProfile(
        userAccessToken,
        userFirstName,
        userLastName,
        userPhone,
        userBirthdate
      );
      navigateProfilePage(0);
    } catch (error) {
      setFirstName(null);
      setLastName(null);
      setPhone(null);
      setBirthdate(null);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      updateProfile(accessToken, firstName, lastName, phone, birthdate);
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
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
              value={firstName}
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
              value={lastName}
              onChange={onLastNameChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="emailValidation">
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <p>{loggedInUser ? loggedInUser.email : ""}</p>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="phoneValidation">
            <Form.Label>
              <b>Phone</b>
            </Form.Label>
            <Form.Control type="text" value={phone} onChange={onPhoneChange} />
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
                    type="button"
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
                    type="button"
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
}

export default ProfilePage;
