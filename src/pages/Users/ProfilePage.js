import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import UsersService from "../../services/UsersService";

import "./ProfilePage.css";

function ProfilePage() {
  const [hasFormSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const maxPhoneLength = 14;
  const [hasPhoneError, setPhoneError] = useState(null);
  const [birthdate, setBirthdate] = useState();

  const accessToken = localStorage.getItem("access_token");

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

  const isPhoneValid = (phoneNumber) => {
    // const phonePattern = "/^[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-/s.]?[0-9]{4}$/";
    // const phonePattern2 = "/^[(]?[0-9]{3}[)]?[0-9]{3}[-/s.]?[0-9]{4}$/";
    // const phonePattern4 = "^[0-9*#+]{3}-[0-9*#+]{3}-[0-9*#+]{4}$";

    // OLD
    // const phonePattern3 = "^[0-9*]{3}-[0-9*]{3}-[0-9*]{4}$";
    // NEW
    // const phonePattern = "^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$";
    const phonePattern =
      "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$";
    const phoneRegex = RegExp(phonePattern);
    return phoneRegex.test(phoneNumber);
  };

  const updateProfile = async (
    userAccessToken,
    userFirstName,
    userLastName,
    userPhone,
    userBirthdate
  ) => {
    try {
      if (isPhoneValid(phone)) {
        await UsersService.updateProfile(
          userAccessToken,
          userFirstName,
          userLastName,
          userPhone,
          userBirthdate
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const user = await UsersService.getProfile(accessToken);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone);
      if (user.birthdate) {
        setBirthdate(moment(user.birthdate).toDate());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      updateProfile(accessToken, firstName, lastName, phone, birthdate);
    }
    event.preventDefault();
    event.stopPropagation();
    setFormSubmitted(true);
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onPhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(
      /[A-Za-z*|":<>[\]{}`\\()';!#%^ˆ~˜_+?,./=\-\s@&$]+/gi,
      ""
    );
    // setPhone(phoneNumber);

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) setPhone(phoneNumber);
    if (phoneNumberLength < 7) {
      setPhone(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`);
    }
    setPhone(
      `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`
    );

    // if (isPhoneValid(phone)) {
    //   // setPhone(phoneNumber);
    //   setPhoneError(false);
    // } else {
    //   // setPhone(phoneNumber);
    //   setPhoneError(true);
    // }
  };

  useEffect(() => {
    if (isPhoneValid(phone)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  }, [phone]);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container>
      <h1>Profile Page</h1>
      <Form noValidate validated={hasFormSubmitted} onSubmit={handleSubmit}>
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
            <p>{email}</p>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="phoneValidation">
            <Form.Label>
              <b>Phone</b>
            </Form.Label>
            <Form.Control
              type="text"
              maxLength={maxPhoneLength}
              value={phone}
              onChange={onPhoneChange}
            />
            <Form.Text className="text-muted">
              Phone pattern: (123) 456-7890
            </Form.Text>
            {hasFormSubmitted && hasPhoneError && (
              <p
                className="mt-2 text-sm cursor-default"
                style={{ color: "red", fontSize: ".875em" }}
              >
                Phone pattern is incorrect
              </p>
            )}
            {hasFormSubmitted && hasPhoneError === false && phone !== null && (
              <p
                className="mt-2 text-sm cursor-default"
                style={{ color: "green", fontSize: ".875em" }}
              >
                Phone pattern is correct
              </p>
            )}
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
              selected={birthdate}
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
