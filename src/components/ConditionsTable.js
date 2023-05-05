import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteConfirmation } from "./DeleteConfirmation";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { ConditionsService } from "../services/ConditionsService";

const ConditionsTable = () => {
  const [conditionId, setConditionId] = useState();
  const [conditions, setConditions] = useState();
  const [condition, setCondition] = useState();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [conditionMessage, setConditionMessage] = useState(null);

  const [isFormValid, setFormValid] = useState();

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

  const navigateNewCondition = useNavigate();

  const handleNewConditionClick = () => {
    navigateNewCondition("/admin/conditions/new");
  };

  const searchCondition = async (id) => {
    try {
      const result = await ConditionsService.getConditionById(id);
      setCondition(result);
      setConditionId(result["id"]);
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

  const submitDeleteCondition = async (condition, id) => {
    try {
      await ConditionsService.deleteCondition(id);
      setFormValid(true);
      setConditionMessage(
        `The condition: ${condition.state} was deleted successfully.`
      );
      setConditions(conditions.filter((c) => c.id !== id));
    } catch (error) {
      console.log(error);

      setFormValid(false);
      setConditionMessage(`The condition: ${condition.state} was not deleted.`);
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
    <React.Fragment>
      <Row>
        <Card.Body>
          {isFormValid === undefined ? (
            <></>
          ) : (
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
          {(conditions ?? []).map((condition) => {
            return (
              <tr>
                <th scope="row">{condition.id}</th>
                <td>{condition.state}</td>
                <td>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => handleUpdateConditionClick(condition.id)}
                      type="button"
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        showDeleteConditionModal(condition.state, condition.id)
                      }
                      type="button"
                      className="btn btn-danger"
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
            confirmModal={submitDeleteCondition}
            hideModal={hideConfirmationModal}
            type={condition}
            id={conditionId}
            message={deleteMessage}
          ></DeleteConfirmation>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export { ConditionsTable };
