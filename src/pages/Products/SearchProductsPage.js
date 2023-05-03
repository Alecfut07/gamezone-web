import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ProductsGrid } from "../../components/ProductsGrid";
import { ProductsService } from "../../services/ProductsService";

const SearchProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // let name = params.get("name");

  const [products, setProducts] = useState();

  const productName = searchParams.get("name");

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.searchProducts(productName);
        setProducts(results);
      } catch (error) {
        setProducts(null);
      }
    })();
  }, [productName]);

  return (
    <Container>
      <h1>You searched for: {productName}</h1>
      <ProductsGrid products={products} />
    </Container>
  );
};

export { SearchProductsPage };
