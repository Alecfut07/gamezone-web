import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import CategoriesService from "../../services/CategoriesService";

function UpdateSubCategoryPage() {
  const accessToken = localStorage.getItem("access_token");

  const { id } = useParams();

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState();
  const [parentCategories, setParentCategories] = useState([]);
  // const [categoryOptionSelected, setCategoryOptionSelected] = useState();
  const [handle, setHandle] = useState("");
  const [hasHandlePatternError, setHandlePatternError] = useState(null);

  const navigateCategoriesPage = useNavigate();

  const updateCategory = async (
    categoryId,
    categoryName,
    _parentCategoryId,
    categoryHandle
  ) => {
    try {
      await CategoriesService.updateCategory(
        categoryId,
        categoryName,
        _parentCategoryId,
        categoryHandle.toLowerCase(),
        accessToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateCategory(id, name, parentCategoryId, handle);
      navigateCategoriesPage("/admin/categories");
    }
    setValidated(true);
  };

  const searchCategory = async (categoryId) => {
    try {
      const result = await CategoriesService.getCategoryById(categoryId);
      console.log("result: ", result);
      setName(result.name);
      setParentCategoryId(result.parent_category_id);
      setHandle(result.handle);
    } catch (error) {
      setName(null);
    }
  };

  const onNameChange = (e) => {
    const categoryName = e.target.value;
    setName(categoryName);
  };

  const onParentCategoriesChange = (e) => {
    const index = e.target.selectedIndex;
    const categoryOptionElement = e.target.childNodes[index];
    const categoryOptionId = categoryOptionElement.getAttribute("id");
    setParentCategoryId(categoryOptionId);
  };

  const onHandleChange = (e) => {
    const handleValue = e.target.value;
    setHandle(handleValue);
  };

  const isHandlePatternValid = (handleText) => {
    const handlePattern = "^[\\w-]+$";
    const handleRegex = RegExp(handlePattern);
    return handleRegex.test(handleText);
  };

  useEffect(() => {
    if (isHandlePatternValid(handle)) {
      setHandlePatternError(false);
    } else {
      setHandlePatternError(true);
    }
  }, [handle]);

  useEffect(() => {
    (async () => {
      searchCategory(id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const results = await CategoriesService.getFilterCategories(true);
        // const parentCategoriesCopy = [...results];
        // const newParentCategory = {
        //   id: 0,
        //   name: "",
        // };
        // parentCategoriesCopy.unshift(newParentCategory);
        setParentCategories(results);
      } catch (error) {
        setParentCategories([]);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>Update Subcategory</h1>
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
                <option
                  id={parentCategory.id}
                  key={parentCategory.id}
                  selected={parentCategory.id === parentCategoryId}
                >
                  {parentCategory.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} md="3" controlId="handleValidation">
            <Form.Label>
              <b>Handle</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Handle"
              value={handle}
              onChange={onHandleChange}
              isInvalid={validated && hasHandlePatternError}
              required
            />
            <Form.Text className="text-muted">
              Handle pattern: gaming-accessories
            </Form.Text>
            {validated && hasHandlePatternError && (
              <p
                className="mt-2 text-sm cursor-default"
                style={{ color: "red", fontSize: "0.875em" }}
              >
                Handle pattern is incorrect
              </p>
            )}
            {validated &&
              hasHandlePatternError === false &&
              handle !== null && (
                <p
                  className="mt-2 text-sm cursor-default"
                  style={{ color: "green", fontSize: "0.875em" }}
                >
                  Handle pattern is correct
                </p>
              )}
          </Form.Group>
        </Row>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateSubCategoryPage;
