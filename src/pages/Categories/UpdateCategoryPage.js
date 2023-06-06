import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import CategoriesService from "../../services/CategoriesService";

function UpdateCategoryPage() {
  const accessToken = localStorage.getItem("access_token");

  const { id } = useParams();

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [hasHandlePatternError, setHandlePatternError] = useState(null);

  const navigateCategoriesPage = useNavigate();

  const updateCategory = async (
    categoryId,
    categoryName,
    parentCategoryId,
    categoryHandle
  ) => {
    try {
      await CategoriesService.updateCategory(
        categoryId,
        categoryName,
        parentCategoryId,
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
      updateCategory(id, name, null, handle);
      navigateCategoriesPage("/admin/categories");
    }
    setValidated(true);
  };

  const searchCategory = async (categoryId) => {
    try {
      const result = await CategoriesService.getCategoryById(categoryId);
      console.log("result: ", result);
      setName(result.name);
      setHandle(result.handle);
    } catch (error) {
      setName(null);
    }
  };

  const onNameChange = (e) => {
    const categoryName = e.target.value;
    setName(categoryName);
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

  return (
    <Container>
      <h1>Update Category</h1>
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

export default UpdateCategoryPage;
