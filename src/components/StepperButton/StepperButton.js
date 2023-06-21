import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import "./StepperButton.css";

function StepperButton({ amount, setDecrease, setIncrease }) {
  return (
    <ButtonGroup className="stepper-button">
      <Button className="decrease-button" onClick={() => setDecrease()}>
        <AiOutlineMinusCircle />
      </Button>
      <div className="label-container">{amount}</div>
      <Button className="increase-button" onClick={() => setIncrease()}>
        <AiOutlinePlusCircle />
      </Button>
      {/* <p className="amount-label">{amount}</p> */}
    </ButtonGroup>
  );
}

export default StepperButton;
