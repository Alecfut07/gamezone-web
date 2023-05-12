import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Image, Badge, Button } from "react-bootstrap";
import moment from "moment";

import StepperButton from "../../components/StepperButton";
import ConditionsHelper from "../../helpers/ConditionsHelper";
import EditionsHelper from "../../helpers/EditionsHelper";
import ProductsService from "../../services/ProductsService";

function ProductDetailsPage() {
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [edition, setEdition] = useState("");

  const [productQuantity, setProductQuantity] = useState(1);

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    } else {
      setProductQuantity(1);
    }
  };

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

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
          <Image src={imageUrl} width="300px" />
        </Col>
        <Col>
          <Row>
            <h3>
              <b>{name}</b>
            </h3>
            <p className="text-muted">
              Release date: {moment(releaseDate).local().format("LL")}
            </p>
          </Row>
          <Row>
            <h3>
              <b>${price}</b>
            </h3>
          </Row>
          <Row className="mt-4">
            <p className="text-muted">Condition:</p>
            <div>
              <h5>
                <Badge bg="secondary">
                  {ConditionsHelper.formatState(condition)}
                </Badge>
              </h5>
            </div>
          </Row>
          <Row className="mt-4">
            <p className="text-muted">Edition:</p>
            <div>
              <h5>
                <Badge bg="secondary">
                  {EditionsHelper.formatType(edition)}
                </Badge>
              </h5>
            </div>
          </Row>
          <Row className="mt-5">
            <Col>
              <div>
                <StepperButton
                  amount={productQuantity}
                  setDecrease={decreaseProductQuantity}
                  setIncrease={increaseProductQuantity}
                />
              </div>
            </Col>
            <Col>
              <div>
                <Button className="ms-auto">Add to cart</Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
