import React, { useMemo, useState } from "react";

const SidebarContext = React.createContext({
  categories: undefined,
  setCategories: undefined,
});

function SidebarProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const sidebarMemo = useMemo(
    () => ({ categories, setCategories }),
    [categories]
  );
  return (
    <SidebarContext.Provider value={sidebarMemo}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider, SidebarContext };
