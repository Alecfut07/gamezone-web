import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import ProductsGrid from "../../components/ProductsGrid";
import Paging from "../../components/Pagination/Paging";
import ProductsService from "../../services/ProductsService";
import "./SearchProductsPage.css";

function SearchProductsPage() {
  const [isLoading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const productName = searchParams.get("name");

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousFlag, setHasPreviousFlag] = useState(false);
  const [hasNextFlag, setHasNextFlag] = useState(false);

  // const pageNumber = 1;

  const searchProducts = async (itemPageNumber = 1) => {
    try {
      if (productName !== "" && productName.length > 0) {
        const results = await ProductsService.searchProducts(
          productName,
          "",
          itemPageNumber,
          pageSize
        );
        setProducts(results.data);
        setCurrentPage(results.pagination.CurrentPage);
        setTotalPages(results.pagination.TotalPages);
        setHasPreviousFlag(results.pagination.HasPrevious);
        setHasNextFlag(results.pagination.HasNext);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setLoading(true);
      } else {
        setLoading(false);
        setProducts([]);
      }
    } catch (error) {
      setLoading(false);
      setProducts([]);
    }
  };

  const onItemClicked = (item) => {
    console.log("item: ", item);
    searchProducts(item);
  };

  useEffect(() => {
    searchProducts();
  }, [productName]);

  const spinner = (
    <div className="spinner-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const productResults =
    products.length > 0 ? (
      <>
        <h1>You searched for: {productName}</h1>
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
        <h1>You searched for: {productName}</h1>
        <p>No results</p>
      </>
    );

  return <Container>{isLoading ? spinner : productResults}</Container>;
}

export default SearchProductsPage;
