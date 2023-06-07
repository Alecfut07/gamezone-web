import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, DropdownButton, Dropdown } from "react-bootstrap";
import CategoriesService from "../../services/CategoriesService";

import "./CategoriesPage.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const navigateToNewCategory = useNavigate();
  const navigateToUpdateCategory = useNavigate();
  const navigateToUpdateSubCategory = useNavigate();

  const handleNewCategoryClick = () => {
    navigateToNewCategory("/admin/categories/new");
  };

  const handleUpdateCategoryClick = (id) => {
    navigateToUpdateCategory(`/admin/categories/update/category/${id}`);
  };

  const handleUpdateSubCategoryClick = (id) => {
    navigateToUpdateSubCategory(`/admin/categories/update/subcategory/${id}`);
  };

  const getParentCategories = async () => {
    try {
      const results = await CategoriesService.getFilterCategories(true);
      setParentCategories(results);
      console.log("results", parentCategories);
      console.log(
        "results",
        results.filter((r) => r.id === 1)
      );
    } catch (error) {
      setParentCategories([]);
    }
  };

  const getCategories = async () => {
    try {
      const results = await CategoriesService.getCategories();
      setCategories(results);
      // console.log("results", results);
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
    getParentCategories();
  }, []);

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
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Subcategory Name</th>
            <th scope="col">Parent Category</th>
            <th scope="col">Category Handle</th>
            <th scope="col">Subcategory Handle</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) =>
            category.subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{subcategory.name}</td>
                <td>
                  {subcategory.parent_category_id === category.id
                    ? category.name
                    : null}
                </td>
                <td>{category.handle}</td>
                <td>{subcategory.handle}</td>
                <td>
                  <Stack direction="horizontal" gap={3}>
                    <DropdownButton
                      // as={ButtonGroup}
                      title="Update"
                      id="bg-nested-dropdown"
                      variant="info"
                    >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() =>
                          handleUpdateCategoryClick(
                            subcategory.parent_category_id
                          )
                        }
                      >
                        Update category
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          handleUpdateSubCategoryClick(subcategory.id)
                        }
                      >
                        Update subcategory
                      </Dropdown.Item>
                    </DropdownButton>
                    <button className="btn btn-danger" type="button">
                      Delete
                    </button>
                  </Stack>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default CategoriesPage;
