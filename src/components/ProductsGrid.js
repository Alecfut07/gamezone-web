import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductsCard from "./ProductsCard";

function ProductsGrid({ products }) {
  const columnsPerRow = 3;

  return (
    <div>
      <Row xs={1} md={columnsPerRow} lg={5}>
        {(products ?? []).map((product) => (
          <Col className="my-3">
            <ProductsCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductsGrid;
