import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Alert, Stack } from "react-bootstrap";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ConditionsService from "../../services/ConditionsService";
import ConditionsHelper from "../../helpers/ConditionsHelper";

function ConditionsPage() {
  const [conditions, setConditions] = useState([]);
  const [condition, setCondition] = useState();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [conditionMessage, setConditionMessage] = useState(null);

  const [isFormValid, setFormValid] = useState();

  const navigateNewCondition = useNavigate();

  const handleNewConditionClick = () => {
    navigateNewCondition("/admin/conditions/new");
  };

  const searchCondition = async (id) => {
    const selectedCondition = conditions.find((c) => c.id === id);
    setCondition(selectedCondition);
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
      setCondition([]);
    } finally {
      setDisplayConfirmationModal(false);
    }
  };

  const navigateUpdateCondition = useNavigate();

  const handleUpdateConditionClick = (id) => {
    navigateUpdateCondition(`/admin/conditions/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const results = await ConditionsService.getConditions();
        setConditions(results);
      } catch (error) {
        setConditions([]);
      }
    })();
  }, []);

  return (
    <>
      <Row>
        <Card.Body>
          {isFormValid === true && (
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
      <div className="">
        <table className="table table-hover table-responsive table-sm">
          <thead>
            <tr>
              <th className="col-1" scope="col">
                #
              </th>
              <th className="col-1" scope="col">
                State
              </th>
              <th className="col-1" style={{ width: "10px" }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((cond, index) => (
              <tr key={cond.id}>
                <th scope="row">{index + 1}</th>
                <td>{ConditionsHelper.formatState(cond.state)}</td>
                <td>
                  <Stack className="mt-auto" direction="horizontal" gap={3}>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={() => handleUpdateConditionClick(cond.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() =>
                        showDeleteConditionModal(cond.state, cond.id)
                      }
                    >
                      Delete
                    </button>
                  </Stack>
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
              id={condition && condition.id}
              message={deleteMessage}
            />
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default ConditionsPage;
