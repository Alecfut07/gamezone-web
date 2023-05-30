import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsGrid from "../../../components/ProductsGrid";
import ProductsService from "../../../services/ProductsService";
// BrowserRouter, Routes, Route,

function SubCategoryPage() {
  const { pathname } = useLocation();
  // const formatedPathname = pathname.replace(/%20|%7C/g, " ");

  const splitUrl = [pathname.split("/")];

  const category = splitUrl[0][1];
  const subCategory = splitUrl[0][2];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.searchProducts(
          "",
          subCategory,
          1,
          2
        );
        setProducts(results.data);
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    })();
  }, [subCategory]);

  const productResults =
    products.length > 0 ? (
      <>
        <h1>
          {category}: {subCategory}
        </h1>
        <ProductsGrid products={products} />
      </>
    ) : (
      <>
        <h1>
          {category}: {subCategory}
        </h1>
        <p>No results</p>
      </>
    );

  return <Container>{productResults}</Container>;
}

export default SubCategoryPage;
