import React from "react";
import { BsArrowRepeat } from "react-icons/bs";

import "./UpdateButton.css";

function UpdateButton({ handleClick }) {
  return (
    <button
      className="update-button"
      type="button"
      onClick={() => handleClick()}
    >
      <span className="update-button-text">Update</span>
      <span className="update-button-icon">
        <BsArrowRepeat />
      </span>
    </button>
  );
}

export default UpdateButton;
