import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");

  const navigateSearchProductsPage = useNavigate();

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const params = createSearchParams({ name: input });
      navigateSearchProductsPage({
        pathname: "/products/search",
        search: `?${params}`,
      });
      formRef.current.reset();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const onProductNameSearchBarChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    const params = createSearchParams({ name: input });
    navigateSearchProductsPage({
      pathname: "/products/search",
      search: `?${params}`,
    });
    formRef.current.reset();
  };

  return (
    <Form ref={formRef} className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={onProductNameSearchBarChange}
      />
      <Button variant="outline-success" onClick={handleSearchClick}>
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
