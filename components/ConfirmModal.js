import { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, onDone, message }) => {
  const [modal, setModal] = useState(isOpen);

  const toggleModal = () => setModal(!modal);

  const onCLickConfirm = () => {
    onDone();
    toggleModal();
  };

  return (
    <Modal size="sm" centered isOpen={modal} toggle={toggleModal}>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onCLickConfirm}>
          {"Si"}
        </Button>{" "}
        <Button color="warning" className="text-white" onClick={toggleModal}>
          {"Cancelar"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ConfirmModal.proptypes = {
  isOpen: PropTypes.bool,
  onDone: PropTypes.func,
  message: PropTypes.string,
};

export default ConfirmModal;
