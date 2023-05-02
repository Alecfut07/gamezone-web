import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CustomNavbar } from "./CustomNavbar";
import { HomePage } from "../pages/Home";
import {
  UpdateProduct,
  ProductsPage,
  CreateNewProduct,
} from "../pages/Products";
import {
  UpdateCondition,
  ConditionsPage,
  CreateNewCondition,
} from "../pages/Conditions";
import { NotFoundPage } from "../pages/NotFound";

const NavbarRouter = () => {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<CreateNewProduct />} />
        <Route path="/products/:id" element={<UpdateProduct />} />
        <Route path="/conditions" element={<ConditionsPage />} />
        <Route path="/conditions/new" element={<CreateNewCondition />} />
        <Route path="/conditions/:id" element={<UpdateCondition />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { NavbarRouter };
