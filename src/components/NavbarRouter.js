import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CustomNavbar } from "./CustomNavbar";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";
import {
  UpdateProduct,
  ProductsPage,
  CreateNewProduct,
  SearchProductsPage,
  ProductDetailsPage,
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/new" element={<CreateNewProduct />} />
        <Route path="/admin/products/update/:id" element={<UpdateProduct />} />
        <Route path="/products/search" element={<SearchProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/admin/conditions" element={<ConditionsPage />} />
        <Route path="/admin/conditions/new" element={<CreateNewCondition />} />
        <Route path="/admin/conditions/:id" element={<UpdateCondition />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { NavbarRouter };
