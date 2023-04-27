import React, { useState, useEffect } from "react";

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

  return (
    <React.Fragment>
      <div>
        <button type="button" class="btn btn-primary">
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
                <td>{product.release_date}</td>
                <td>{product.condition.state}</td>
                <td>{product.edition.type}</td>
                <td>
                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-info">
                      Update
                    </button>
                    <button type="button" class="btn btn-danger">
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
