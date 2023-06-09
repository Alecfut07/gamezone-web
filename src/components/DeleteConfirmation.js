import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteConfirmation({
  showModal,
  hideModal,
  confirmModal,
  id,
  type,
  message,
}) {
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
          Delete Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(type, id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
