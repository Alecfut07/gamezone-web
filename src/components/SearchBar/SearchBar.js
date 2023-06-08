import React, { useRef, useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = useState("");

  const navigateSearchProductsPage = useNavigate();

  const formRef = useRef(null);

  const [matchWindow, setMatchWindow] = useState(
    window.matchMedia("(min-width: 768px) and (min-width: 1400px)").matches
  );
  // 767 px width

  const searchbar = (isMatch) => ({
    width: isMatch ? "600px" : "300px",
    height: "40px",
    // border: "none",
    // background: "#c0c0c0",
    // boxShadow: "inset 1px 1px 1px green",
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

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px) and (min-width: 1400px)")
      .addEventListener("change", (e) => setMatchWindow(e.matches));
  });

  return (
    <Form ref={formRef} className="d-flex" lg={3} onSubmit={handleSubmit}>
      <InputGroup className="input-group-container">
        <button
          type="button"
          className="search-icon-button"
          onClick={handleSearchClick}
        >
          <BsSearch />
        </button>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 shadow-none"
          style={searchbar(matchWindow)}
          aria-label="Search"
          onChange={onProductNameSearchBarChange}
          required
        />
      </InputGroup>
      {/* <Button variant="outline-success" onClick={handleSearchClick}>
        Search
      </Button> */}
    </Form>
  );
}

export default SearchBar;
