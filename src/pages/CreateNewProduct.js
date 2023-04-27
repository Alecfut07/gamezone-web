import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNewProduct = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    sendNewProduct();
    setValidated(true);
  };

  const sendNewProduct = async () => {
    const body = {
      name: name,
      price: 0.0,
      releaseDate: new Date().toISOString(),
      condition_id: 1,
      edition_id: 1,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("https://localhost:7269/products", options);
    if (response.ok) {
      const results = await response.json();
      console.log("asdfasdf");
    } else {
      console.log("error");
    }
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  //   const [startDate, setStartDate] = useState(new Date());
  //   const years = range(1800, getYear(new Date()) + 1, 1);
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  return (
    <Container>
      <h1>Create New Product</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="nameValidation">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              onChange={onNameChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="priceValidation">
            <Form.Label>Price</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="text"
                aria-aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        {/* <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="releaseDateValidation">
            <Form.Label>Release Date</Form.Label>
            <DatePicker
              placeholderText="Click to select a date"
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
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid release date.
            </Form.Control.Feedback>
          </Form.Group>
        </Row> */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="descriptionValidation">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid description.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="conditionValidation">
            <Form.Label>Condition</Form.Label>
            <Form.Select aria-label="Default select example" required>
              <option selected disabled value="">
                Choose condition...
              </option>
              <option>NEW</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid condition.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="editionValidation">
            <Form.Label>Edition</Form.Label>
            <Form.Select aria-label="Default select example" required>
              <option selected disabled value="">
                Choose edition...
              </option>
              <option>DELUXE EDITION</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid edition.
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

export { CreateNewProduct };
