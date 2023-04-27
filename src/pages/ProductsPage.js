import React from "react";
import Container from "react-bootstrap/Container";
import { ProductsTable } from "../components/ProductsTable";

const ProductsPage = () => {
  return (
    <Container>
      <ProductsTable />
    </Container>
  );
};

export { ProductsPage };
