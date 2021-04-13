import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const IconModal = (props) => {
  const { buttonLabel, className, toggle, modal } = props;
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Select Icons</ModalHeader>
        <ModalBody>Show All Icons</ModalBody>
      </Modal>
    </>
  );
};

export default IconModal;
