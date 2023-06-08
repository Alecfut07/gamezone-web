import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = useState("");

  const navigateSearchProductsPage = useNavigate();

  const formRef = useRef(null);

  const [matchWindow, setMatchWindow] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  // 767 px width

  const searchbar = (isMatch) => ({
    width: isMatch ? "600px" : "400px",
    height: "40px",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
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

  // const handleSearchClick = () => {
  //   if (input.length > 0) {
  //     const params = createSearchParams({ name: input });
  //     navigateSearchProductsPage({
  //       pathname: "/products/search",
  //       search: `?${params}`,
  //     });
  //     formRef.current.reset();
  //     setInput("");
  //   }
  // };

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatchWindow(e.matches));
  });

  return (
    <Form ref={formRef} className="d-flex" lg={3} onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        style={searchbar(matchWindow)}
        aria-label="Search"
        onChange={onProductNameSearchBarChange}
        required
      />
      {/* <Button variant="outline-success" onClick={handleSearchClick}>
        Search
      </Button> */}
    </Form>
  );
}

export default SearchBar;
