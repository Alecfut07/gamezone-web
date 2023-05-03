import React from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsGrid } from "../../components/ProductsGrid";
import { Container } from "react-bootstrap";

const SearchProductsPage = ({ match, location }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // let name = params.get("name");
  return (
    <Container>
      <h1>SearchProductsPage</h1>
      <p>{searchParams.get("name")}</p>
      <ProductsGrid />
    </Container>
  );
};

export { SearchProductsPage };
