import React, { useMemo, useContext } from "react";
import { IconContext } from "react-icons";
import { BsCartFill } from "react-icons/bs";
import { CartContext } from "../../context";

import "./Cart.css";

function Cart() {
  const cartStyle = useMemo(() => ({ color: "black", size: "25px" }));
  const { cartTotal } = useContext(CartContext);

  return (
    <IconContext.Provider value={cartStyle}>
      <BsCartFill />
      <span className="minicart-quantity">{cartTotal}</span>
    </IconContext.Provider>
  );
}

export default Cart;
