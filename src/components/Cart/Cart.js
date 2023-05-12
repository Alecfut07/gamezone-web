import React, { useMemo } from "react";
import { IconContext } from "react-icons";
import { BsCartFill } from "react-icons/bs";

function Cart() {
  const cartStyle = useMemo(() => ({ color: "black", size: "25px" }));
  return (
    <IconContext.Provider value={cartStyle}>
      <BsCartFill />
    </IconContext.Provider>
  );
}

export default Cart;
