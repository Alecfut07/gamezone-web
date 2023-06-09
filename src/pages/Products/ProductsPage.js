import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Container, Row, Card, Alert, Stack } from "react-bootstrap";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ProductsService from "../../services/ProductsService";
import ConditionsHelper from "../../helpers/ConditionsHelper";
import EditionsHelper from "../../helpers/EditionsHelper";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import UpdateButton from "../../components/Buttons/UpdateButton/UpdateButton";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";

function ProductsPage() {
  const accessToken = localStorage.getItem("access_token");

  const [products, setProducts] = useState([]);
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
        const results = await ProductsService.getProducts(accessToken);
        setProducts(results);
      } catch (error) {
        setProducts([]);
      }
    })();
  }, []);

  const handleNewProductClick = () => {
    navigateNewproduct("/admin/products/new");
  };

  const searchProduct = async (id) => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
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
      await ProductsService.deleteProduct(id, accessToken);
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
      setProduct([]);
    } finally {
      setDisplayConfirmationModal(false);
    }
  };

  const handleUpdateProductClick = (id) => {
    navigateUpdateProduct(`/admin/products/update/${id}`);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Card.Body>
          {isFormValid === true && (
            <Alert variant={isFormValid ? "success" : "danger"}>
              {productMessage}
            </Alert>
          )}
        </Card.Body>
      </Row>
      <Row>
        <div className="table-header">
          <span>Products</span>
          <AddButton handleClick={handleNewProductClick} />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
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
            {(products ?? []).map((prod, index) =>
              prod.product_variants.map((pv) => (
                <tr key={pv.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{prod.name}</td>
                  <td>{moment(prod.release_date).local().format("LL")}</td>
                  <td>{prod.description}</td>
                  <td>${pv.price.toFixed(2)}</td>
                  <td>{ConditionsHelper.formatState(pv.condition.state)}</td>
                  <td>{EditionsHelper.formatType(pv.edition.type)}</td>
                  <td>
                    <Stack className="mt-auto" direction="horizontal" gap={3}>
                      <UpdateButton
                        handleClick={() => handleUpdateProductClick(prod.id)}
                      />
                      <DeleteButton
                        handleClick={() =>
                          showDeleteProductModal(prod.name, prod.id)
                        }
                      />
                    </Stack>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDeleteProduct}
          hideModal={hideConfirmationModal}
          type={product}
          id={product && product.id}
          message={deleteMessage}
        />
      </Row>
    </Container>
  );
}

export default ProductsPage;
