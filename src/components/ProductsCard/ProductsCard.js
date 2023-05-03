import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./ProductsCard.css";

const ProductsCard = ({ product }) => {
  const navigateProductPage = useNavigate();

  const handleProductCardClick = () => {
    navigateProductPage({
      pathname: `/products/${product.name}`,
    });
  };

  return (
    <React.Fragment>
      <Card className="product-card" onClick={handleProductCardClick}>
        <Card.Header>
          <Card.Img src={product.image_url} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <p>
            <b>${product.price}</b>
          </p>
          <p>
            Release Date: {moment(product.release_date).local().format("LL")}
          </p>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export { ProductsCard };
