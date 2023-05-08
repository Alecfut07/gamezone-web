import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";

import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import moment from "moment";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import { ProductsService } from "../../services/ProductsService";
import { ConditionsService } from "../../services/ConditionsService";
import { EditionsService } from "../../services/EditionsService";
import "./UpdateProduct.css";

const UpdateProductPage = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [imageURL, setImageURL] = useState();
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [productVariants, setProductVariants] = useState([]);
  const [price, setPrice] = useState("");
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

  const navigateProducts = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateProduct(
        id,
        imageURL,
        name,
        releaseDate,
        description,
        productVariants
      );
      navigateProducts("/admin/products");
      navigateProducts(0);
    }
    setValidated(true);
  };

  const updateProduct = async (
    id,
    imageURL,
    name,
    releaseDate,
    description,
    productVariants
  ) => {
    try {
      await ProductsService.updateProduct(
        id,
        imageURL,
        name,
        releaseDate,
        description,
        [productVariants]
      );
    } catch (error) {
      setImageURL(null);
      setName(null);
      setReleaseDate(null);
      setDescription(null);
      setProductVariants(null);
    }
  };

  useEffect(() => {
    (async () => {
      getProductById(id);
    })();
  }, []);

  const getProductById = async (id) => {
    try {
      const result = await ProductsService.getProductById(id);
      setImageURL(result.image_url);
      setName(result.name);
      setReleaseDate(result.release_date);
      setDescription(result.description);
      setProductVariants({
        ...productVariants,
        ["price"]: result.product_variants[0].price,
        ["condition_id"]: result.product_variants[0].condition.id,
        ["edition_id"]: result.product_variants[0].edition.id,
      });
    } catch (error) {
      setImageURL(null);
      setName(null);
      setReleaseDate(null);
      setDescription(null);
      setProductVariants(null);
    }
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

  useEffect(() => {
    (async () => {
      try {
        const results = await EditionsService.getEditions();
        setEditions(results);
      } catch (error) {
        setEditions(null);
      }
    })();
  }, []);

  const onImageURL_Change = (e) => {
    setImageURL(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setPrice(price);

    setProductVariants({ ...productVariants, ["price"]: price });
  };

  const onConditionChange = (e) => {
    const index = e.target.selectedIndex;
    setConditionId(index);

    setProductVariants({ ...productVariants, ["condition_id"]: index });
  };

  const onEditionChange = (e) => {
    const index = e.target.selectedIndex;
    setEditionId(index);

    setProductVariants({ ...productVariants, ["edition_id"]: index });
  };

  return (
    <Container>
      <h1>Update Product</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="imageURLValidation">
            <Image src={imageURL} width="300px"></Image>
            <Form.Label>
              <b>Image URL</b>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={imageURL}
              onChange={onImageURL_Change}
              placeholder="Image URL"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid image url.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="nameValidation">
            <Form.Label>
              <b>Name</b>
            </Form.Label>
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
            <Form.Label>
              <b>Price</b>
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                value={productVariants.price}
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
            <Form.Label>
              <b>Release Date</b>
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
            <Form.Label>
              <b>Description</b>
            </Form.Label>
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
            <Form.Label>
              <b>Condition</b>
            </Form.Label>
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
                  <option
                    selected={condition.id === productVariants.condition_id}
                  >
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
            <Form.Label>
              <b>Edition</b>
            </Form.Label>
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
                  <option selected={edition.id === productVariants.edition_id}>
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

export default { UpdateProductPage };
