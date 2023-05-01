import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { DeleteConfirmation } from "./DeleteConfirmation";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { ProductsService } from "../services/ProductsService";

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
      try {
        const results = await ProductsService.getProducts();
        setProducts(results);
      } catch (error) {
        setProducts(null);
      }
    })();
  }, []);

  const navigateNewproduct = useNavigate();

  const handleNewProductClick = () => {
    navigateNewproduct("/products/new");
  };

  const searchProduct = async (id) => {
    try {
      const result = await ProductsService.getProductById(id);
      setProduct(result);
      setProductId(result["id"]);
    } catch (error) {
      setProduct(null);
      setProductId(null);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await ProductsService.deleteProduct(id);
    } catch (error) {
      setProduct(null);
      setProductId(null);
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

  const navigateUpdateProduct = useNavigate();

  const handleUpdateProductClick = (id) => {
    navigateUpdateProduct(`/products/${id}`);
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
                <td>{moment(product.release_date).local().format("LL")}</td>
                <td>{product.condition.state}</td>
                <td>{product.edition.type}</td>
                <td>
                  <div class="d-grid gap-2">
                    <button
                      onClick={() => handleUpdateProductClick(product.id)}
                      type="button"
                      class="btn btn-info"
                    >
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
