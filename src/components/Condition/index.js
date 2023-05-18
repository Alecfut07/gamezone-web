/* eslint-disable */
import React, { useState } from "react";

const ConditionsContext = React.createContext();

function ConditionsProvider({ children }) {
  const [conditions, setConditions] = useState([]);
  return (
    <ConditionsContext.Provider value={{ conditions, setConditions }}>
      {children}
    </ConditionsContext.Provider>
  );
}

export { ConditionsProvider, ConditionsContext };
