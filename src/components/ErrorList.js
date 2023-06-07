import React from "react";
import { ListGroup } from "react-bootstrap";

function ErrorList({ validated, value }) {
  const valueRules = [
    {
      id: 1,
      rule: "Min 6 characters",
      validation: () => value.length >= 6,
    },
    {
      id: 2,
      rule: "Max 20 characters",
      validation: () => value.length <= 20,
    },
  ];

  const isValueValid = () => {
    const isValid = valueRules.every((obj) => obj.validation(value));
    return isValid;
  };

  return (
    validated &&
    isValueValid() === false && (
      <ListGroup className="mt-3">
        {valueRules.map((obj) => {
          const variant = obj.validation(value) ? "success" : "danger";
          return (
            <ListGroup.Item key={obj.id} variant={variant}>
              {obj.rule}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    )
  );
}

export default ErrorList;
