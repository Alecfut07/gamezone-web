import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";
import { ProductsService } from "../services/ProductsService";
import { ConditionsService } from "../services/ConditionsService";

const CreateNewProduct = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      sendNewProduct();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [conditionId, setConditionId] = useState();
  const [conditions, setConditions] = useState();
  const [editionId, setEditionId] = useState();
  const [editions, setEditions] = useState();

  const sendNewProduct = async () => {
    try {
      const result = await ProductsService.createNewProduct(
        name,
        price,
        releaseDate,
        description,
        conditionId,
        editionId
      );
    } catch (error) {
      setName(null);
      setPrice(null);
      setReleaseDate(null);
      setDescription(null);
      setConditionId(null);
      setEditionId(null);
    }
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const results = await ConditionsService.getConditions();
        setConditions(results);
      } catch (error) {
        setConditions(null);
      }
    })();
  }, []);

  const onConditionChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setConditionId(option);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("https://localhost:7269/editions");
      if (response.ok) {
        const results = await response.json();
        setEditions(results);
      } else {
        setEditions(null);
      }
    })();
  }, []);

  const onEditionChange = (e) => {
    const index = e.target.selectedIndex;
    console.log("index: ", index);
    const el = e.target.childNodes[index];
    console.log("el: ", el);
    const option = el.getAttribute("id");
    console.log("option: ", option);
    setEditionId(option);
  };

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
                onChange={onPriceChange}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="releaseDateValidation">
            <Form.Label>Release Date</Form.Label>
            <DatePicker
              dateFormat="MMMM d, yyyy"
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
              selected={releaseDate}
              onChange={(date, e) => setReleaseDate(date, e)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid release date.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={onDescriptionChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="conditionValidation">
            <Form.Label>Condition</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={onConditionChange}
              required
            >
              <option selected disabled value="">
                Choose condition...
              </option>
              {(conditions ?? []).map((condition) => {
                return <option id={condition.id}>{condition.state}</option>;
              })}
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid condition.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="editionValidation">
            <Form.Label>Edition</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={onEditionChange}
              required
            >
              <option selected disabled value="">
                Choose edition...
              </option>
              {(editions ?? []).map((edition) => {
                return <option id={edition.id}>{edition.type}</option>;
              })}
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
