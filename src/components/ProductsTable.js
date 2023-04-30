import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteConfirmation } from "./DeleteConfirmation";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const ProductsTable = () => {
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [productMessage, setProductMessage] = useState(null);

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

  const searchProduct = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://localhost:7269/products/${id}`,
      options
    );
    if (response.ok) {
      const result = await response.json();
      setProduct(result);
      setProductId(result["id"]);
    } else {
      setProduct(null);
      setProductId(null);
    }
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
    } else {
      console.log("error");
    }
  };

  const showDeleteProductModal = (productName, id) => {
    // setProduct(product);
    // setProductId(id);
    searchProduct(id);
    setProductMessage(null);

    setDeleteMessage(
      `Are you sure you want to delete this product: ${productName}?`
    );

    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDeleteProduct = (product, id) => {
    deleteProduct(id);
    setProductMessage(`The product: ${product.name} was deleted successfully.`);
    setProducts(products.filter((p) => p.id !== id));
    setDisplayConfirmationModal(false);
  };

  return (
    <React.Fragment>
      <Row>
        <Card.Body>
          {productMessage && <Alert variant="success">{productMessage}</Alert>}
        </Card.Body>
      </Row>
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
                      onClick={() =>
                        showDeleteProductModal(product.name, product.id)
                      }
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
        <tfoot>
          <DeleteConfirmation
            showModal={displayConfirmationModal}
            confirmModal={submitDeleteProduct}
            hideModal={hideConfirmationModal}
            product={product}
            id={productId}
            message={deleteMessage}
          ></DeleteConfirmation>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export { ProductsTable };
