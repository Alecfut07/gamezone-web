import React from "react";
import Container from "react-bootstrap/Container";
import ProductsTable from "../../components/ProductsTable";
import "./ProductsPage.css";

const ProductsPage = () => {
  return (
    <Container>
      <ProductsTable />
    </Container>
  );
};

export default { ProductsPage };
