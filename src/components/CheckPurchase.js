import React, { useContext } from "react";
import { PurchaseContext } from "../context";
import HomePage from "../pages/Home";

function CheckPurchase({ children }) {
  const { isPurchaseCompleted } = useContext(PurchaseContext);

  if (isPurchaseCompleted === false) {
    return <HomePage />;
  }
  return children;
}

export default CheckPurchase;
