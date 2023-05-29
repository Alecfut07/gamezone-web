import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsGrid from "../../../components/ProductsGrid";
import ProductsService from "../../../services/ProductsService";
// BrowserRouter, Routes, Route,

function VideoGamesPage() {
  const { pathname } = useLocation();
  //   console.log(pathname.replace(/%20|%7C/g, " "));
  const formatedPathname = pathname.replace(/%20|%7C/g, " ");
  const splitUrl = [formatedPathname.split("/")];
  //   console.log(splitUrl);
  const category = splitUrl[0][2];
  //   console.log(category);
  //   console.log(window.location.pathname);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.searchProducts("", category);
        setProducts(results);
        console.log(products);
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    })();
  }, [category]);

  const productResults =
    products.length > 0 ? (
      <>
        <h1>Category: {category}</h1>
        <ProductsGrid products={products} />
      </>
    ) : (
      <>
        <h1>Category: {category}</h1>
        <p>No results</p>
      </>
    );

  return <Container>{productResults}</Container>;
}

export default VideoGamesPage;
