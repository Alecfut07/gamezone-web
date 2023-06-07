import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import "./AddButton.css";

function AddButton({ handleClick }) {
  return (
    <button type="button" onClick={() => handleClick()} className="add-button">
      <span className="add-button-text">Add</span>
      <span className="add-button-icon">
        <BsPlusCircle />
      </span>
    </button>
  );
}

export default AddButton;
