import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import { ProductsService } from "../services/ProductsService";

const SearchBar = () => {
  const [input, setInput] = useState("");
  // const [searchParams, setSearchParams] = useSearchParams();
  // const name = searchParams.get("name");

  const navigateSearchProductsPage = useNavigate();

  const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const results = await ProductsService.getProducts();
  //         setProducts(results);
  //       } catch (error) {
  //         setProducts(null);
  //       }
  //     })();
  //   }, []);
  const params = { name: input };

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      navigateSearchProductsPage({
        pathname: "/products/search",
        search: `?${createSearchParams(params)}`,
      });
      formRef.current.reset();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const onProductNameSearchBarChange = (e) => {
    setInput(e.target.value);
  };

  // const onProductNameSearchBarKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     navigateSearchProductsPage({
  //       pathname: "/products/search",
  //       search: `?${createSearchParams(params)}`,
  //     });
  //   }
  // };

  const handleSearchClick = (e) => {
    // const params = { name: input };
    // setSearchParams({ name: input });
    navigateSearchProductsPage({
      pathname: "/products/search",
      search: `?${createSearchParams(params)}`,
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
};

export { SearchBar };
