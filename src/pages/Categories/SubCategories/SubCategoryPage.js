import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsGrid from "../../../components/ProductsGrid";
import ProductsService from "../../../services/ProductsService";
// BrowserRouter, Routes, Route,

function SubCategoryPage() {
  const { pathname } = useLocation();
  // console.log(pathname);
  //   console.log(pathname.replace(/%20|%7C/g, " "));
  // const formatedPathname = pathname.replace(/%20|%7C/g, " ");
  const formatedPathname = pathname.replace(/-/g, " ");
  // console.log(formatedPathname);
  const splitUrl = [formatedPathname.split("/")];
  //   console.log(splitUrl);
  const category = splitUrl[0][1];
  const subCategory = splitUrl[0][2];
  //   console.log(category);
  //   console.log(window.location.pathname);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.searchProducts("", subCategory);
        setProducts(results);
        // console.log(products);
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
          {category}: {subCategory.replace(/%7C/g, " | ")}
        </h1>
        <ProductsGrid products={products} />
      </>
    ) : (
      <>
        <h1>
          {category}: {subCategory.replace(/%7C/g, " | ")}
        </h1>
        <p>No results</p>
      </>
    );

  return <Container>{productResults}</Container>;
}

export default SubCategoryPage;
