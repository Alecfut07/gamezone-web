import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Paging.css";

function Paging({ current, maxPages, hasPrevious, hasNext, onItemClicked }) {
  const [currentPage, setCurrentPage] = useState(current);
  const totalPages = maxPages;

  const numberOfPages = [];

  const onPageChange = (pageSelected) => {
    setCurrentPage(pageSelected);
    onItemClicked(pageSelected);
  };

  for (let page = 1; page <= maxPages; page += 1) {
    numberOfPages.push(
      <Pagination.Item
        key={page}
        onClick={() => onPageChange(page)}
        active={page === currentPage}
      >
        {page}
      </Pagination.Item>
    );
  }

  const handleFirstPage = () => {
    setCurrentPage(1);
    onItemClicked(1);
  };

  const handlePrevPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
      onItemClicked(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
      onItemClicked(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    onItemClicked(totalPages);
  };

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First
        onClick={() => handleFirstPage()}
        disabled={!hasPrevious}
      />
      <Pagination.Prev
        onClick={() => handlePrevPage()}
        disabled={!hasPrevious}
      />
      {numberOfPages}
      <Pagination.Next onClick={() => handleNextPage()} disabled={!hasNext} />
      <Pagination.Last onClick={() => handleLastPage()} disabled={!hasNext} />
    </Pagination>
  );
}

export default Paging;
