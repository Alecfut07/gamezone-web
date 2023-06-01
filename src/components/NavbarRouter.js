import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import {
  UsersWrapper,
  SignInPage,
  SignUpPage,
  ProfilePage,
} from "../pages/Users";
import {
  CategoriesWrapper,
  CategoriesPage,
  CreateNewCategoryPage,
} from "../pages/Categories";
import {
  SubCategoryWrapper,
  SubCategoryPage,
} from "../pages/Categories/SubCategories";
import {
  ProductsWrapper,
  ProductsPage,
  CreateNewProductPage,
  UpdateProductPage,
  SearchProductsPage,
  ProductDetailsPage,
} from "../pages/Products";
import {
  ConditionsWrapper,
  ConditionsPage,
  CreateNewConditionPage,
  UpdateConditionPage,
} from "../pages/Conditions";
import CartPage from "../pages/Cart/CartPage";
import PaymentMethodPage from "../pages/Checkout/PaymentMethodPage";
import SuccessfulPurchasePage from "../pages/Checkout/SuccessfulPurchasePage";
import NotFoundPage from "../pages/NotFound";
import Layout from "../pages/Layout";
import RequireAuth from "./RequireAuth";

function NavbarRouter({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<HomePage />} layout={Layout} />
        <Route path="/users" element={<UsersWrapper />}>
          <Route path="/users/sign_in" element={<SignInPage />} />
          <Route path="/users/sign_up" element={<SignUpPage />} />
          <Route path="/users/profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/admin/categories"
          element={
            <RequireAuth>
              {" "}
              <CategoriesWrapper />
            </RequireAuth>
          }
        >
          <Route path="" element={<CategoriesPage />} />
          <Route path="new" element={<CreateNewCategoryPage />} />
        </Route>
        <Route path="/:category" element={<SubCategoryWrapper />}>
          <Route path=":subcategory" element={<SubCategoryPage />} />
        </Route>
        <Route
          path="/admin/products"
          element={
            <RequireAuth>
              <ProductsWrapper />
            </RequireAuth>
          }
        >
          <Route path="" element={<ProductsPage />} />
          <Route path="new" element={<CreateNewProductPage />} />
          <Route path="update/:id" element={<UpdateProductPage />} />
        </Route>
        <Route path="/products/search" element={<SearchProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/admin/conditions"
          element={
            <RequireAuth>
              <ConditionsWrapper />
            </RequireAuth>
          }
        >
          <Route path="" element={<ConditionsPage />} />
          <Route path="new" element={<CreateNewConditionPage />} />
          <Route path=":id" element={<UpdateConditionPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<PaymentMethodPage />} />
        <Route path="/success" element={<SuccessfulPurchasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavbarRouter;
