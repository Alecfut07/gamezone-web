import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

const ProductsGrid = () => {
  const columnsPerRow = 5;

  return (
    <React.Fragment>
      <Row xs={1} md={columnsPerRow}>
        <Col>
          <Card>
            <Card.Header>
              <Card.Img src="https://media.gamestop.com/i/gamestop/10141904/The-Legend-of-Zelda-Breath-of-the-Wild---Nintendo-Switch?$plp-tile3x$" />
            </Card.Header>
            <Card.Body>
              <Card.Title>Zelda Breath of the Wild</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text></Card.Text>
            </Card.Body>
            <Card.Footer>
              <p>
                <b>$54.99</b>
              </p>
              <p>Release Date: March 3, 2017</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export { ProductsGrid };
