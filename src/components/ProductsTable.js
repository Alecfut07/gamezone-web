import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ProductsTable = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("https://localhost:7269/products");
      if (response.ok) {
        const results = await response.json();
        setProducts(results);
      } else {
        setProducts(null);
      }
    })();
  }, []);

  const navigateNewproduct = useNavigate();

  const handleNewProductClick = () => {
    navigateNewproduct("/products/new");
  };

  const deleteProduct = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://localhost:7269/products/${id}`,
      options
    );
    if (response.ok) {
      const results = await response.json();
      console.log("asdfasdf");
    } else {
      console.log("error");
    }
  };

  return (
    <React.Fragment>
      <div>
        <button
          type="button"
          onClick={handleNewProductClick}
          class="btn btn-primary"
        >
          Create new product
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Release Date</th>
            <th scope="col">State</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((product) => {
            return (
              <tr>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{moment(product.release_date).local().format("LLL")}</td>
                <td>{product.condition.state}</td>
                <td>{product.edition.type}</td>
                <td>
                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-info">
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { ProductsTable };
