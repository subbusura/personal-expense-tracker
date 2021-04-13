import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CurrencyModal = (props) => {
  const { buttonLabel, className, toggle, modal } = props;
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Select Flag</ModalHeader>
        <ModalBody>Currency List</ModalBody>
      </Modal>
    </>
  );
};

export default CurrencyModal;
