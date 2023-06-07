import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

import "./DeleteButton.css";

function DeleteButton({ handleClick }) {
  return (
    <button
      className="delete-button"
      type="button"
      onClick={() => handleClick()}
    >
      <span className="delete-button-text">Delete</span>
      <span className="delete-button-icon">
        <BsFillTrash3Fill />
      </span>
    </button>
  );
}

export default DeleteButton;
