import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { ProductsCard } from "./ProductsCard";

const ProductsGrid = ({ products }) => {
  const columnsPerRow = 3;

  return (
    <React.Fragment>
      <Row xs={1} md={columnsPerRow} lg={5}>
        {(products ?? []).map((product) => {
          return (
            <Col className="my-3">
              <ProductsCard product={product} />
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export { ProductsGrid };
