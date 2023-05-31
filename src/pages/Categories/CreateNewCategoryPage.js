import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import CategoriesService from "../../services/CategoriesService";

function CreateNewCategoryPage() {
  const accessToken = localStorage.getItem("access_token");

  const [validated, setValidated] = useState(false);

  const [parentCategories, setParentCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryOptionSelected, setCategoryOptionSelected] = useState();

  const sendNewCategory = async () => {
    try {
      await CategoriesService.createNewCategory(
        name,
        categoryOptionSelected,
        accessToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      sendNewCategory();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  const onNameChange = (e) => {
    const categoryName = e.target.value;
    setName(categoryName);
  };

  const onParentCategoriesChange = (e) => {
    const index = e.target.selectedIndex;
    const categoryOptionElement = e.target.childNodes[index];
    const categoryOptionId = categoryOptionElement.getAttribute("id");
    if (categoryOptionId === 0) {
      setCategoryOptionSelected(null);
    } else {
      setCategoryOptionSelected(categoryOptionId);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const results = await CategoriesService.getFilterCategories(true);
        const parentCategoriesCopy = [...results];
        const newParentCategory = {
          id: 0,
          name: "",
        };
        parentCategoriesCopy.unshift(newParentCategory);
        setParentCategories(parentCategoriesCopy);
      } catch (error) {
        setParentCategories([]);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>Create New Category</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Form.Group as={Col} md="3" controlId="nameValidation">
            <Form.Label>
              <b>Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={onNameChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} md="3" controlId="parentCategoryValidation">
            <Form.Label>
              <b>Category</b>
            </Form.Label>
            <Form.Select onChange={onParentCategoriesChange}>
              {parentCategories.map((parentCategory) => (
                <option id={parentCategory.id} key={parentCategory.id}>
                  {parentCategory.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default CreateNewCategoryPage;
