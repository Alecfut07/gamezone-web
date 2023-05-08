import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Alert } from "react-bootstrap";
import DeleteConfirmation from "./DeleteConfirmation";
import ConditionsService from "../services/ConditionsService";

function ConditionsTable() {
  const [conditionId, setConditionId] = useState();
  const [conditions, setConditions] = useState();
  const [condition, setCondition] = useState();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [conditionMessage, setConditionMessage] = useState(null);

  const [isFormValid, setFormValid] = useState();

  const navigateNewCondition = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const results = await ConditionsService.getConditions();
        setConditions(results);
      } catch (error) {
        setConditions(null);
      }
    })();
  }, []);

  const handleNewConditionClick = () => {
    navigateNewCondition("/admin/conditions/new");
  };

  const searchCondition = async (id) => {
    try {
      const result = await ConditionsService.getConditionById(id);
      setCondition(result);
      setConditionId(result.id);
    } catch (error) {
      setCondition(null);
      setConditionId(null);
    }
  };

  const showDeleteConditionModal = (conditionState, id) => {
    searchCondition(id);
    setConditionMessage(null);

    setDeleteMessage(
      `Are you sure you want to delete this condition: ${conditionState}?`
    );

    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDeleteCondition = async (conditionToDelete, id) => {
    try {
      await ConditionsService.deleteCondition(id);
      setFormValid(true);
      setConditionMessage(
        `The condition: ${conditionToDelete.state} was deleted successfully.`
      );
      setConditions(conditions.filter((c) => c.id !== id));
    } catch (error) {
      console.log(error);

      setFormValid(false);
      setConditionMessage(
        `The condition: ${conditionToDelete.state} was not deleted.`
      );
      setCondition(null);
      setConditionId(null);
    } finally {
      setDisplayConfirmationModal(false);
    }
  };

  const navigateUpdateCondition = useNavigate();

  const handleUpdateConditionClick = (id) => {
    navigateUpdateCondition(`/admin/conditions/${id}`);
  };

  return (
    <>
      <Row>
        <Card.Body>
          {isFormValid === false && (
            <Alert variant={isFormValid ? "success" : "danger"}>
              {conditionMessage}
            </Alert>
          )}
        </Card.Body>
      </Row>
      <div>
        <button
          type="button"
          onClick={handleNewConditionClick}
          className="btn btn-primary"
        >
          Create new condition
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">State</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(conditions ?? []).map((cond) => (
            <tr key={cond.id}>
              <th scope="row">{cond.id}</th>
              <td>{cond.state}</td>
              <td>
                <div className="d-grid gap-2">
                  <button
                    onClick={() => handleUpdateConditionClick(cond.id)}
                    type="button"
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      showDeleteConditionModal(cond.state, cond.id)
                    }
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <DeleteConfirmation
            showModal={displayConfirmationModal}
            confirmModal={submitDeleteCondition}
            hideModal={hideConfirmationModal}
            type={condition}
            id={conditionId}
            message={deleteMessage}
          />
        </tfoot>
      </table>
    </>
  );
}

export default ConditionsTable;
