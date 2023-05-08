import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsService from "../../services/ProductsService";

function ProductDetailsPage() {
  const { productName } = useParams();

  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductsService.searchProducts(productName);
        setProduct(result);
        console.log(product);
      } catch (error) {
        setProduct(null);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>ProductDetailsPage</h1>
      {/* <p>{product[0].name}</p>
      <p>{product[0].price}</p>
      <p>{product[0].release_date}</p>
      <p>{product[0].description}</p>
      <p>{product[0].condition.state}</p>
      <p>{product[0].edtion.type}</p> */}
    </Container>
  );
}

export default ProductDetailsPage;
