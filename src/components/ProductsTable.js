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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">State</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((product) => {
            return (
              <tr>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.condition.state}</td>
                <td>{product.edition.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export { ProductsTable };
