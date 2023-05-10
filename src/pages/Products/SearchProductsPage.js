import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsService from "../../services/ProductsService";
import "./SearchProductsPage.css";

function SearchProductsPage() {
  const [isLoading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const productName = searchParams.get("name");

  useEffect(() => {
    (async () => {
      try {
        if (productName !== "" && productName.length > 0) {
          const results = await ProductsService.searchProducts(productName);
          setProducts(results);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          setLoading(true);
        } else {
          setLoading(false);
          setProducts([]);
        }
      } catch (error) {
        setLoading(false);
        setProducts([]);
      }
    })();
  }, [productName]);

  const spinner = (
    <div className="spinner-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const productResults =
    products.length > 0 ? (
      <>
        <h1>You searched for: {productName}</h1>
        <ProductsGrid products={products} />
      </>
    ) : (
      <>
        <h1>You searched for: {productName}</h1>
        <p>No results</p>
      </>
    );

  return <Container>{isLoading ? spinner : productResults}</Container>;
}

export default SearchProductsPage;
