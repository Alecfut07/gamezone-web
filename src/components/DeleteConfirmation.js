import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  product,
  message,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Product Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">{message}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(product, id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteConfirmation };
