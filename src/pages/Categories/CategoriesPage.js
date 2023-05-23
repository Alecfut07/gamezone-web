import React from "react";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const navigateToNewCategory = useNavigate();

  const handleNewCategoryClick = () => {
    navigateToNewCategory("/admin/categories/new");
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={handleNewCategoryClick}
          className="btn btn-primary"
        >
          Create new category
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
      </table>
    </>
  );
}

export default CategoriesPage;
