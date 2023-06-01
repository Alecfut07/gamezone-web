import React, { useMemo, useState } from "react";

const CartContext = React.createContext({
  cartTotal: undefined,
  setCartTotal: undefined,
});

function CartProvider({ children }) {
  const [cartTotal, setCartTotal] = useState(0);
  const cartMemo = useMemo(() => ({ cartTotal, setCartTotal }), [cartTotal]);

  return (
    <CartContext.Provider value={cartMemo}>{children}</CartContext.Provider>
  );
}

export { CartProvider, CartContext };
