import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Row, Card, Alert } from "react-bootstrap";
import DeleteConfirmation from "./DeleteConfirmation";
import ProductsService from "../services/ProductsService";

function ProductsTable() {
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [productMessage, setProductMessage] = useState(null);

  const [isFormValid, setFormValid] = useState();

  const navigateNewproduct = useNavigate();

  const navigateUpdateProduct = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const results = await ProductsService.getProducts();
        setProducts(results);
      } catch (error) {
        setProducts(null);
      }
    })();
  }, []);

  const handleNewProductClick = () => {
    navigateNewproduct("/admin/products/new");
  };

  const searchProduct = async (id) => {
    try {
      const result = await ProductsService.getProductById(id);
      setProduct(result);
      setProductId(result.id);
    } catch (error) {
      setProduct(null);
      setProductId(null);
    }
  };

  const showDeleteProductModal = (productName, id) => {
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

  const submitDeleteProduct = async (productToDelete, id) => {
    try {
      await ProductsService.deleteProduct(id);
      setFormValid(true);
      setProductMessage(
        `The product: ${productToDelete.name} was deleted successfully.`
      );
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      setFormValid(false);
      setProductMessage(
        `The product: ${productToDelete.name} was not deleted.`
      );
      setProduct(null);
      setProductId(null);
    } finally {
      setDisplayConfirmationModal(false);
    }
  };

  const handleUpdateProductClick = (id) => {
    navigateUpdateProduct(`/admin/products/update/${id}`);
  };

  return (
    <>
      <Row>
        <Card.Body>
          {isFormValid === false && (
            <Alert variant={isFormValid ? "success" : "danger"}>
              {productMessage}
            </Alert>
          )}
        </Card.Body>
      </Row>
      <div>
        <button
          type="button"
          onClick={handleNewProductClick}
          className="btn btn-primary"
        >
          Create new product
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Release Date</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">State</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((prod) =>
            prod.product_variants.map((pv) => (
              <tr key={pv.id}>
                <th scope="row">{prod.id}</th>
                <td>{prod.name}</td>
                <td>{moment(prod.release_date).local().format("LL")}</td>
                <td>{prod.description}</td>
                <td>{pv.price}</td>
                <td>{pv.condition.state}</td>
                <td>{pv.edition.type}</td>
                <td>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => handleUpdateProductClick(prod.id)}
                      type="button"
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => showDeleteProductModal(prod.name, prod.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <DeleteConfirmation
            showModal={displayConfirmationModal}
            confirmModal={submitDeleteProduct}
            hideModal={hideConfirmationModal}
            type={product}
            id={productId}
            message={deleteMessage}
          />
        </tfoot>
      </table>
    </>
  );
}

export default ProductsTable;
