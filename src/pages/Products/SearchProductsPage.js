import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsService from "../../services/ProductsService";
import "./SearchProductsPage.css";

function SearchProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState();

  const productName = searchParams.get("name");

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.searchProducts(productName);
        setProducts(results);
        setTimeout(() => {
          setIsLoading(true);
        }, 1500);
        setIsLoading(false);
      } catch (error) {
        setProducts(null);
      }
    })();
  }, [productName]);

  return (
    <Container>
      {isLoading ? (
        [
          <h1>You searched for: {productName}</h1>,
          <ProductsGrid products={products} />,
        ]
      ) : (
        <div className="spinner-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
}

export default SearchProductsPage;
