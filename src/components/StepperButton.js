import React from "react";
import { Button, Stack } from "react-bootstrap";

function StepperButton({ amount, setDecrease, setIncrease }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button onClick={() => setDecrease()}>-</Button>
      <div>
        <p>{amount}</p>
      </div>
      <Button onClick={() => setIncrease()}>+</Button>
    </Stack>
  );
}

export default StepperButton;
