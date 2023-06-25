import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./AboutMe.css";

function AboutMe() {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <div className="photo-frame">
            <img
              className="alec-photo"
              src="https://media.licdn.com/dms/image/D5603AQHcV64xVgexdQ/profile-displayphoto-shrink_800_800/0/1676858120137?e=1693440000&v=beta&t=75PhqTyoHQi5ZXID1jqaq912GpWhXaj7YC30wcuawsg"
              alt="Alec"
            />
            <p>hola</p>
          </div>
        </Col>
        <Col>
          <p>About me</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;
