import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import "./ProductsCard.css";

function ProductsCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card className="product-card">
        <Card.Header>
          <Card.Img src={product.image_url} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" />
          <Card.Text />
        </Card.Body>
        <Card.Footer>
          <p>
            <b>${product.product_variants[0].price}</b>
          </p>
          <p>
            Release Date: {moment(product.release_date).local().format("LL")}
          </p>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default ProductsCard;
