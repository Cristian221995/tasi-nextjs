import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import ConfirmModal from "./ConfirmModal";
import { useRouter } from "next/router";

const InsufficientBalanceModal = ({ isOpen }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleOnDone = () => {
    router.push("/cancellation");
    toggleModal();
  };

  const toggleAndRedirect = (url) => {
    toggleModal();
    router.push(url);
  };

  return (
    <Modal size="md" centered isOpen={modalOpen} toggle={toggleModal}>
      <ModalBody>
        {
          "Su saldo es insuficiente. Puede consultar su saldo, probar con otro monto o cancelar la operación"
        }
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col>
            <Button
              color="warning"
              className="text-white"
              onClick={() => setShowConfirmModal(true)}
            >
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              onClick={() => toggleAndRedirect("/balance")}
            >
              Consultar saldo
            </Button>
          </Col>
          <Col>
            <Button color="primary" onClick={toggleModal}>
              Otro monto
            </Button>
          </Col>
        </Row>
      </ModalFooter>
      {showConfirmModal && (
        <ConfirmModal
          onDone={toggleOnDone}
          isOpen={showConfirmModal}
          message={"¿Está seguro que desea cancelar la operación?"}
        />
      )}
    </Modal>
  );
};

InsufficientBalanceModal.proptypes = {
  isOpen: PropTypes.bool,
};

export default InsufficientBalanceModal;
