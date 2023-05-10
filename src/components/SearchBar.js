import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");

  const navigateSearchProductsPage = useNavigate();

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity()) {
      const params = createSearchParams({ name: input });
      navigateSearchProductsPage({
        pathname: "/products/search",
        search: `?${params}`,
      });
      formRef.current.reset();
      setInput("");
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const onProductNameSearchBarChange = (e) => {
    setInput(e.target.value);
  };

  // const handleEnterKeyDown = (e) => {
  //   if (e.key === "Enter" && input === "") {
  //     alert("Enter an empty value in search bar");
  //   }
  // };

  const handleSearchClick = () => {
    if (input.length > 0) {
      const params = createSearchParams({ name: input });
      navigateSearchProductsPage({
        pathname: "/products/search",
        search: `?${params}`,
      });
      formRef.current.reset();
      setInput("");
    }
  };

  return (
    <Form ref={formRef} className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={onProductNameSearchBarChange}
        // onKeyDown={handleEnterKeyDown}
        required
      />
      <Button variant="outline-success" onClick={handleSearchClick}>
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
