import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Card, Alert, Stack } from "react-bootstrap";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ConditionsService from "../../services/ConditionsService";
import ConditionsHelper from "../../helpers/ConditionsHelper";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import UpdateButton from "../../components/Buttons/UpdateButton/UpdateButton";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";

function ConditionsPage() {
  const accessToken = localStorage.getItem("access_token");

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
      await ConditionsService.deleteCondition(id, accessToken);
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
        const results = await ConditionsService.getConditions(accessToken);
        setConditions(results);
      } catch (error) {
        setConditions([]);
      }
    })();
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Card.Body>
          {isFormValid === true && (
            <Alert variant={isFormValid ? "success" : "danger"}>
              {conditionMessage}
            </Alert>
          )}
        </Card.Body>
      </Row>
      <Row>
        <div className="table-header">
          <span>Conditions</span>
          <AddButton handleClick={handleNewConditionClick} />
        </div>
        <table className="table table-hover table-responsive table-sm">
          <thead>
            <tr>
              <th className="col-1" scope="col">
                #
              </th>
              <th className="col-10" scope="col">
                State
              </th>
              <th className="col-1" scope="col">
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
                    <UpdateButton
                      handleClick={() => handleUpdateConditionClick(cond.id)}
                    />
                    <DeleteButton
                      handleClick={() =>
                        showDeleteConditionModal(cond.state, cond.id)
                      }
                    />
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDeleteCondition}
          hideModal={hideConfirmationModal}
          type={condition}
          id={condition && condition.id}
          message={deleteMessage}
        />
      </Row>
    </Container>
  );
}

export default ConditionsPage;
