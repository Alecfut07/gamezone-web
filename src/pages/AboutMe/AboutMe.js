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
          <div className="training-courses-container">
            <h3>Training/Courses</h3>
            <div className="course">
              <Row>
                <p>Platzi, 2022</p>
              </Row>
              <Row>
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/git-github/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-github-0b729570-934d-47d8-ba6b-610d7f15e0ec.png"
                        alt="Course of Git and GitHub"
                      />
                      <p>Git and GitHub</p>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/docker/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badges-fundamentos-docker-c1277cec-3ef7-4557-9f83-2649bec9fe70.png"
                        alt="Course of Docker"
                      />
                      <p>Docker</p>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/npm/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-npm-js-c48fb4c0-a4d3-4773-b3ca-e9f25c543d0e.png"
                        alt="Course of NPM"
                      />
                      <p>NPM</p>
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5 mb-5">
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/react/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-landing-introduccion-react-js_badge-5cb7b891-69d3-4de4-bdab-1641b4c30312.png"
                        alt="Course of React.js"
                      />
                      <p>React.js</p>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/html-css/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badges-html-css-afa64acb-64a4-486d-96a5-f930fbb7ee32.png"
                        alt="Course of HTML and CSS"
                      />
                      <p>HTML and CSS</p>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="platzi-badge-frame">
                    <a href="https://platzi.com/cursos/javascript-poo/">
                      <img
                        className="platzi-badge"
                        src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badges-curso-js-poo-51952eaf-1573-43d6-9b8a-4a19967aa5e9.png"
                        alt="Basic Course on Object-Oriented Programming with JavaScript"
                      />
                      <p>OOP with JS</p>
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;
