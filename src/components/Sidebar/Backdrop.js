/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react";
import useScrollLock from "../useScrollLock";

import "./Backdrop.css";

function Backdrop({ isSidebarVisible, setSidebarVisible }) {
  const { lockScroll, unlockScroll } = useScrollLock();

  const dismiss = () => {
    if (isSidebarVisible) {
      setSidebarVisible(false);
      unlockScroll();
    }
  };

  useEffect(() => {
    if (isSidebarVisible) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isSidebarVisible]);

  return <div className="backdrop" onClick={dismiss} />;
}

export default Backdrop;
