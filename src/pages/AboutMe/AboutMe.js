import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import "./AboutMe.css";

function AboutMe() {
  return (
    <Container className="mt-3">
      <Row>
        <Col lg={6}>
          <div className="title-container">
            <h3>Alec Ortega</h3>
            <p>Junior Software Developer</p>
          </div>
          <div className="photo-frame">
            <img
              className="alec-photo"
              src="https://media.licdn.com/dms/image/D5603AQHcV64xVgexdQ/profile-displayphoto-shrink_800_800/0/1676858120137?e=1693440000&v=beta&t=75PhqTyoHQi5ZXID1jqaq912GpWhXaj7YC30wcuawsg"
              alt="Alec"
            />
          </div>
          <Row>
            <div className="social-media-container">
              <div className="social">
                <a href="https://github.com/Alecfut07">
                  <div className="social-icon">
                    <AiFillGithub />
                  </div>
                  <div className="social-text">github.com/Alecfut07</div>
                </a>
              </div>
              <div className="social">
                <a href="https://www.linkedin.com/in/alec-ortega/">
                  <div className="social-icon">
                    <AiFillLinkedin />
                  </div>
                  <div className="social-text">
                    linkedin.com/in/alec-ortega/
                  </div>
                </a>
              </div>
            </div>
            {/* <Col lg={6}>
              <p>
                <a href="https://github.com/Alecfut07">
                  <AiFillGithub className="icon" />
                  github.com/Alecfut07
                </a>
              </p>
            </Col>
            <Col lg={6}>
              <p>
                <a href="https://www.linkedin.com/in/alec-ortega/">
                  <AiFillLinkedin className="icon" />
                  linkedin.com/in/alec-ortega/
                </a>
              </p>
            </Col> */}
          </Row>
        </Col>
        <Col lg={6}>
          <div className="about-me-container ms-auto mt-3">
            <h3>About me</h3>
            <p>
              I am a computer science engineer determined to work and develop
              innovative applications. I am seeking new experiences and
              challenges as a software developer. For my goal, I would like to
              enter the field of web development. I have a Bachelor of Science
              (B.S.) in Computer Science from CETYS University.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;
