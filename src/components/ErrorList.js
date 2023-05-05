import React from "react";
import { ListGroup } from "react-bootstrap";

const ErrorList = ({ value, setValueValid }) => {
  const valueRules = [
    {
      rule: "Min 6 characters",
      validation: (value) => value.length >= 6,
    },
    {
      rule: "Max 20 characters",
      validation: (value) => value.length <= 20,
    },
  ];

  const isFieldValid = () => {
    const isValid = valueRules.every((obj) => obj.validation(value));
    setValueValid(isValid);
    return isValid;
  };

  return isFieldValid ? (
    <></>
  ) : (
    <ListGroup>
      {valueRules.forEach((obj) => {
        const variant = obj.validation(value) ? "success" : "danger";
        <ListGroup.Item variant={variant}>{obj.rule}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};

export { ErrorList };
