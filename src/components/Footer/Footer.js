import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer mt-3">
      <div className="sb-footer section-padding">
        <div className="sb-footer-links">
          <div className="sb-footer-links-div">
            <h4>About Me</h4>
            <a href="/about-me">
              <p>Alec Ortega</p>
            </a>
          </div>
          <div className="sb-footer-links-div">
            <h4>Social</h4>
            <div className="socialmedia">
              <a href="https://www.linkedin.com/in/alec-ortega/">
                <AiFillLinkedin className="icon" />
              </a>
              <a href="https://github.com/Alecfut07">
                <AiFillGithub className="icon" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="sb-footer-below">
          <div className="sb-footer-copyright">
            <p>GameZone - @{new Date().getFullYear()} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
