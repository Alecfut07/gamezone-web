import React, { useMemo, useState } from "react";

const PurchaseContext = React.createContext({
  isPurchaseCompleted: undefined,
  setPurchaseCompleted: undefined,
});

function PurchaseProvider({ children }) {
  const [isPurchaseCompleted, setPurchaseCompleted] = useState(false);
  const purchaseMemo = useMemo(
    () => ({ isPurchaseCompleted, setPurchaseCompleted }),
    [isPurchaseCompleted]
  );

  return (
    <PurchaseContext.Provider value={purchaseMemo}>
      {children}
    </PurchaseContext.Provider>
  );
}

export { PurchaseProvider, PurchaseContext };
