import React, { useContext } from "react";
import { CartContext } from "../context";
import HomePage from "../pages/Home";

function CheckCartTotal({ children }) {
  const { cartTotal } = useContext(CartContext);

  if (cartTotal === 0) {
    return <HomePage />;
  }
  return children;
}

export default CheckCartTotal;
