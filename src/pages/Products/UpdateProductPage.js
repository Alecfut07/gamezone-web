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

import moment from "moment";
import DatePicker from "../../components/DatePicker";

import ProductsService from "../../services/ProductsService";
import ConditionsService from "../../services/ConditionsService";
import EditionsService from "../../services/EditionsService";

import ConditionsHelper from "../../helpers/ConditionsHelper";
import EditionsHelper from "../../helpers/EditionsHelper";

import "./UpdateProduct.css";

function UpdateProductPage() {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [imageURL, setImageURL] = useState();
  const [imageKey, setImageKey] = useState("");
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [conditionId, setConditionId] = useState();
  const [conditions, setConditions] = useState([]);
  const [editionId, setEditionId] = useState();
  const [editions, setEditions] = useState([]);

  const navigateProducts = useNavigate();

  const getProductById = async (productId) => {
    try {
      const result = await ProductsService.getProductById(productId);
      setImageURL(result.image_url);
      setName(result.name);
      setDescription(result.description);
      setPrice(result.product_variants[0].price);
      setConditionId(result.product_variants[0].condition.id);
      setEditionId(result.product_variants[0].edition.id);
      if (result.release_date) {
        setReleaseDate(moment(result.release_date).toDate());
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const image = e.target.files[0];
      const result = await ProductsService.uploadImage(image);
      setImageKey(result);
    } catch (error) {
      setImageKey(null);
    }
  };

  const updateProduct = async (
    productId,
    productImageURL,
    productImageKey,
    productName,
    productReleaseDate,
    productDescription,
    productVariantPrice,
    productVariantConditionId,
    productVariantEditionId
  ) => {
    try {
      await ProductsService.updateProduct(
        productId,
        productImageURL,
        productImageKey,
        productName,
        productReleaseDate,
        productDescription,
        [
          {
            price: productVariantPrice,
            condition_id: productVariantConditionId,
            edition_id: productVariantEditionId,
          },
        ]
      );
      navigateProducts("/admin/products");
      navigateProducts(0);
    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      debugger;
      updateProduct(
        id,
        imageURL,
        imageKey,
        name,
        releaseDate,
        description,
        price,
        conditionId,
        editionId
      );
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  useEffect(() => {
    (async () => {
      getProductById(id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const results = await ConditionsService.getConditions();
        const conditionsCopy = [...results];
        const defaultCondition = {
          id: 0,
          selected: true,
          disabled: true,
          state: "Choose condition...",
        };
        conditionsCopy.unshift(defaultCondition);
        setConditions(conditionsCopy);
      } catch (error) {
        setConditions([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const results = await EditionsService.getEditions();
        const editionsCopy = [...results];
        const defaultEdition = {
          id: 0,
          selected: true,
          disabled: true,
          type: "Choose edition...",
        };
        editionsCopy.unshift(defaultEdition);
        setEditions(editionsCopy);
      } catch (error) {
        setEditions([]);
      }
    })();
  }, []);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onPriceChange = (e) => {
    const productPrice = parseFloat(e.target.value);
    setPrice(productPrice);
  };

  const onConditionChange = (e) => {
    const conditionIndex = e.target.selectedIndex;
    setConditionId(parseInt(conditionIndex, 10));
  };

  const onEditionChange = (e) => {
    const editionIndex = e.target.selectedIndex;
    setEditionId(parseInt(editionIndex, 10));
  };

  return (
    <Container>
      <h1>Update Product</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="imageURLValidation">
            <Image src={imageURL} width="300px" />
            <Form.Label>
              <b>Upload an image</b>
            </Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileUpload}
              placeholder="Image File"
              accept="image/png, image/jpeg"
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
                value={price}
                onChange={onPriceChange}
                onWheel={(e) => e.target.blur()}
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
              selectedDate={releaseDate}
              setSelectedDate={setReleaseDate}
            />
            {validated && releaseDate === null && (
              <p
                className="mt-2 cursor-default"
                style={{ color: "red", fontSize: ".875em" }}
              >
                Release date is required
              </p>
            )}
            {validated && releaseDate !== null && (
              <p
                className="mt-2 text-sm cursor-default"
                style={{ color: "green", fontSize: ".875em" }}
              >
                Looks good!
              </p>
            )}
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
              {conditions.map((condition) => (
                <option
                  id={condition.id}
                  key={condition.id}
                  selected={condition.id === conditionId}
                  disabled={condition.disabled}
                >
                  {ConditionsHelper.formatState(condition.state) ??
                    condition.state}
                </option>
              ))}
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
              {editions.map((edition) => (
                <option
                  id={edition.id}
                  key={edition.id}
                  selected={edition.id === editionId}
                  disabled={edition.disabled}
                >
                  {EditionsHelper.formatType(edition.type) ?? edition.type}
                </option>
              ))}
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
}

export default UpdateProductPage;
