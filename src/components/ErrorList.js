import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

function ErrorList({ value, setValueValid }) {
  const valueRules = [
    {
      rule: "Min 6 characters",
      validation: () => value.length >= 6,
    },
    {
      rule: "Max 20 characters",
      validation: () => value.length <= 20,
    },
  ];

  const [isFieldValid, setFieldValid] = useState();

  // const isFieldValid = () => {
  //   const isValid = valueRules.every((obj) => obj.validation(value));
  //   setValueValid(isValid);
  //   return isValid;
  // };

  setFieldValid(() => {
    const isValid = valueRules.every((obj) => obj.validation(value));
    setValueValid(isValid);
    return isValid;
  });

  return isFieldValid ? (
    <div />
  ) : (
    <ListGroup>
      {valueRules.forEach((obj) => {
        const variant = obj.validation(value) ? "success" : "danger";
        <ListGroup.Item variant={variant}>{obj.rule}</ListGroup.Item>;
      })}
    </ListGroup>
  );
}

export default ErrorList;
