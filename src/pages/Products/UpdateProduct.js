import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import { ProductsService } from "../../services/ProductsService";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const navigateProducts = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateProduct(
        id,
        name,
        price,
        releaseDate,
        description,
        conditionId,
        editionId
      );
      navigateProducts("/products");
    }
    setValidated(true);
  };

  const updateProduct = async (
    id,
    name,
    price,
    releaseDate,
    description,
    conditionId,
    editionId
  ) => {
    try {
      const results = await ProductsService.updateProduct(
        id,
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

  useEffect(() => {
    (async () => {
      searchProduct(id);
    })();
  }, []);

  const searchProduct = async (id) => {
    try {
      const result = await ProductsService.getProductById(id);
      setName(result.name);
      setPrice(result.price);
      setReleaseDate(result.release_date);
      setDescription(result.description);
      setConditionId(result.condition.id);
      setEditionId(result.edition.id);
    } catch (error) {
      setName(null);
      setPrice(null);
      setReleaseDate(null);
      setDescription(null);
      setConditionId(null);
      setEditionId(null);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("https://localhost:7269/conditions");
      if (response.ok) {
        const results = await response.json();
        setConditions(results);
      } else {
        setConditions(null);
      }
    })();
  }, []);

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

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [conditionId, setConditionId] = useState();
  const [conditions, setConditions] = useState();
  const [editionId, setEditionId] = useState();
  const [editions, setEditions] = useState();

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

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onConditionChange = (e) => {
    const index = e.target.selectedIndex;
    setConditionId(index);
  };

  const onEditionChange = (e) => {
    const index = e.target.selectedIndex;
    setEditionId(index);
  };

  return (
    <Container>
      <h1>Update Product</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="nameValidation">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Name"
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
                value={price}
                onChange={onPriceChange}
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
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="releaseDateValidation">
            <Form.Label>Release Date</Form.Label>
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
              selected={moment(releaseDate).toDate()}
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
              value={description}
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
              <option disabled value="">
                Choose condition...
              </option>
              {(conditions ?? []).map((condition) => {
                return (
                  <option selected={condition.id === conditionId}>
                    {condition.state}
                  </option>
                );
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
              <option disabled value="">
                Choose edition...
              </option>
              {(editions ?? []).map((edition) => {
                return (
                  <option selected={edition.id === editionId}>
                    {edition.type}
                  </option>
                );
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

export { UpdateProduct };
