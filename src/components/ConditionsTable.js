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
    navigateNewCondition("/conditions/new");
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

  const deleteCondition = async (id) => {
    try {
      const result = await ConditionsService.deleteCondition(id);
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

  const submitDeleteCondition = (condition, id) => {
    deleteCondition(id);
    setConditionMessage(
      `The condition: ${condition.state} was deleted successfully.`
    );
    setConditions(conditions.filter((c) => c.id !== id));
    setDisplayConfirmationModal(false);
  };

  const navigateUpdateCondition = useNavigate();

  const handleUpdateConditionClick = (id) => {
    navigateUpdateCondition(`/conditions/${id}`);
  };

  return (
    <React.Fragment>
      <Row>
        <Card.Body>
          {conditionMessage && (
            <Alert variant="success">{conditionMessage}</Alert>
          )}
        </Card.Body>
      </Row>
      <div>
        <button
          type="button"
          onClick={handleNewConditionClick}
          class="btn btn-primary"
        >
          Create new condition
        </button>
      </div>
      <table class="table">
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
                  <div class="d-grid gap-2">
                    <button
                      onClick={() => handleUpdateConditionClick(condition.id)}
                      type="button"
                      class="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        showDeleteConditionModal(condition.state, condition.id)
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
