import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsGrid from "../../../components/ProductsGrid";
import Paging from "../../../components/Pagination/Paging";
import ProductsService from "../../../services/ProductsService";
// BrowserRouter, Routes, Route,

function SubCategoryPage() {
  const { pathname } = useLocation();
  // const formatedPathname = pathname.replace(/%20|%7C/g, " ");

  const splitUrl = [pathname.split("/")];

  const category = splitUrl[0][1];
  const subCategory = splitUrl[0][2];

  const [products, setProducts] = useState([]);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousFlag, setHasPreviousFlag] = useState(false);
  const [hasNextFlag, setHasNextFlag] = useState(false);

  const searchProducts = async (itemPageNumber = 1) => {
    try {
      const results = await ProductsService.searchProducts(
        "",
        subCategory,
        itemPageNumber,
        pageSize
      );
      setProducts(results.data);
      setCurrentPage(results.pagination.CurrentPage);
      setTotalPages(results.pagination.TotalPages);
      setHasPreviousFlag(results.pagination.HasPrevious);
      setHasNextFlag(results.pagination.HasNext);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  const onItemClicked = (item) => {
    searchProducts(item);
  };

  useEffect(() => {
    searchProducts();
  }, [subCategory]);

  const productResults =
    products.length > 0 ? (
      <>
        <h1>
          {category}: {subCategory}
        </h1>
        <ProductsGrid products={products} />
        <Paging
          current={currentPage}
          maxPages={totalPages}
          hasPrevious={hasPreviousFlag}
          hasNext={hasNextFlag}
          onItemClicked={onItemClicked}
        />
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
