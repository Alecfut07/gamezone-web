import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductsPage } from "../pages/ProductsPage";
import { CustomNavbar } from "./CustomNavbar";

const NavbarRouter = () => {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/home" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { NavbarRouter };
