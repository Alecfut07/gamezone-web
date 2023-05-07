import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CustomNavbar } from "./CustomNavbar";
import { SignInPage } from "../pages/SignIn";
import { SignUpPage } from "../pages/SignUp";
import { ProfilePage } from "../pages/Users";
import { HomePage } from "../pages/Home";
import {
  ProductsPage,
  CreateNewProductPage,
  UpdateProductPage,
  SearchProductsPage,
  ProductDetailsPage,
} from "../pages/Products";
import {
  ConditionsPage,
  CreateNewConditionPage,
  UpdateConditionPage,
} from "../pages/Conditions";
import { NotFoundPage } from "../pages/NotFound";

const NavbarRouter = () => {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/sign_in" element={<SignInPage />} />
        <Route path="/users/sign_up" element={<SignUpPage />} />
        <Route path="/users/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/new" element={<CreateNewProductPage />} />
        <Route
          path="/admin/products/update/:id"
          element={<UpdateProductPage />}
        />
        <Route path="/products/search" element={<SearchProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/admin/conditions" element={<ConditionsPage />} />
        <Route
          path="/admin/conditions/new"
          element={<CreateNewConditionPage />}
        />
        <Route path="/admin/conditions/:id" element={<UpdateConditionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { NavbarRouter };
