import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsService from "../../services/ProductsService";

function HomePage() {
  const [products, setProducts] = useState([]);

  const getProductsByCollection = async () => {
    try {
      const results = await ProductsService.getProductsByCollection();
      setProducts(results);
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    getProductsByCollection();
  }, []);

  return (
    <Container>
      <ProductsGrid products={products} />
    </Container>
  );
}

export default HomePage;
