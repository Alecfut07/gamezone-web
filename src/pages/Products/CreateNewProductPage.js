import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import DatePicker from "../../components/DatePicker";
import ProductsService from "../../services/ProductsService";
import ConditionsService from "../../services/ConditionsService";
import EditionsService from "../../services/EditionsService";
import ConditionsHelper from "../../helpers/ConditionsHelper";
import EditionsHelper from "../../helpers/EditionsHelper";
import "./CreateNewProduct.css";
import CategoriesService from "../../services/CategoriesService";

function CreateNewProductPage() {
  const accessToken = localStorage.getItem("access_token");

  const [validated, setValidated] = useState(false);

  const [imageKey, setImageKey] = useState("");
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [productVariant, setProductVariant] = useState({
    edition_id: 0,
    condition_id: 0,
    categories: [],
  });
  const [conditions, setConditions] = useState([]);
  const [editions, setEditions] = useState([]);

  // const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  // const [subCategoryOptionSelected, setSubCategoryOptionSelected] = useState();

  const navigateProducts = useNavigate();

  const handleFileUpload = async (e) => {
    try {
      const image = e.target.files[0];
      const result = await ProductsService.uploadImage(image, accessToken);
      setImageKey(result);
    } catch (error) {
      setImageKey(null);
    }
  };

  const sendNewProduct = async () => {
    try {
      await ProductsService.createNewProduct(
        imageKey,
        name,
        releaseDate,
        description,
        [productVariant],
        accessToken
      );
      navigateProducts("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      sendNewProduct();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onPriceChange = (e) => {
    const productPrice = parseFloat(e.target.value);
    productVariant.price = productPrice;
    setProductVariant(productVariant);
  };

  const onConditionChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    productVariant.condition_id = parseInt(option, 10);
    setProductVariant(productVariant);
  };

  const onEditionChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    productVariant.edition_id = parseInt(option, 10);
    setProductVariant(productVariant);
  };

  const onSubCategoriesChange = (e) => {
    const index = e.target.selectedIndex;
    const subCategoryOptionElement = e.target.childNodes[index];
    const subCategoryOptionId = subCategoryOptionElement.getAttribute("id");
    setProductVariant(productVariant);
    productVariant.categories = [
      {
        category_id: parseInt(subCategoryOptionId, 10),
      },
    ];
  };

  useEffect(() => {
    (async () => {
      try {
        const results = await CategoriesService.getFilterCategories(false);
        const subCategoriesCopy = [...results];
        const newSubCategory = {
          id: 0,
          name: "Choose a subcategory",
        };
        subCategoriesCopy.unshift(newSubCategory);
        setSubCategories(subCategoriesCopy);
      } catch (error) {
        setSubCategories([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const results = await ConditionsService.getConditions(accessToken);
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
        const results = await EditionsService.getEditions(accessToken);
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

  return (
    <Container>
      <h1>Create New Product</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="imageURLValidation">
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
              placeholder="Name"
              value={name}
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
            <Form.Label>
              <b>Price</b>
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                defaultValue="0.0"
                value={productVariant.price}
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
              placeholder="Description"
              value={description}
              onChange={onDescriptionChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="subCategoryValidation">
            <Form.Label>
              <b>Subcategory</b>
            </Form.Label>
            <Form.Select onChange={onSubCategoriesChange}>
              {subCategories.map((subcategory) => (
                <option id={subcategory.id} key={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </Form.Select>
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
                  selected={condition.selected}
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
                  selected={edition.selected}
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

export default CreateNewProductPage;
