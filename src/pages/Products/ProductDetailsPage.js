import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import moment from "moment";
import ProductsService from "../../services/ProductsService";

function ProductDetailsPage() {
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [edition, setEdition] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductsService.getProductById(id);
        setImageUrl(result.image_url);
        setName(result.name);
        setReleaseDate(result.release_date);
        setPrice(result.product_variants[0].price);
        setCondition(result.product_variants[0].condition.state);
        setEdition(result.product_variants[0].edition.type);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Image src={imageUrl} />
        </Col>
        <Col>
          <Row>
            <h3>
              <b>{name}</b>
            </h3>
            <p className="text-muted">
              {moment(releaseDate).local().format("LL")}
            </p>
          </Row>
          <Row>
            <p>
              <b>${price}</b>
            </p>
          </Row>
          <Row>
            <p className="text-muted">Condition:</p>
            <p>
              <b>{condition}</b>
            </p>
          </Row>
          <Row>
            <p className="text-muted">Edition:</p>
            <p>
              <b>{edition}</b>
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
