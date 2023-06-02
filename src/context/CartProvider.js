import React, { useMemo, useState } from "react";

const CartContext = React.createContext({
  cartTotal: undefined,
  setCartTotal: undefined,
  subTotal: undefined,
  setSubTotal: undefined,
});

function CartProvider({ children }) {
  const [cartTotal, setCartTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const cartMemo = useMemo(
    () => ({ cartTotal, setCartTotal, subtotal, setSubtotal }),
    [cartTotal, subtotal]
  );

  return (
    <CartContext.Provider value={cartMemo}>{children}</CartContext.Provider>
  );
}

export { CartProvider, CartContext };
