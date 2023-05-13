import React, { useMemo } from "react";
import { IconContext } from "react-icons";
import { BsCartFill } from "react-icons/bs";

import "./Cart.css";

function Cart({ amount }) {
  const cartStyle = useMemo(() => ({ color: "black", size: "25px" }));
  return (
    <IconContext.Provider value={cartStyle}>
      <BsCartFill />
      <span className="minicart-quantity">{amount}</span>
    </IconContext.Provider>
  );
}

export default Cart;
