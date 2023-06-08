/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

import "./Backdrop.css";

function Backdrop({ isSidebarVisible, setSidebarVisible }) {
  const dismiss = () => {
    if (isSidebarVisible) {
      setSidebarVisible(false);
    }
  };

  return <div className="backdrop" onClick={dismiss} />;
}

export default Backdrop;
