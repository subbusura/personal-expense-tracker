import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const WalletDeleteModal = (props) => {
  const { buttonLabel, className, toggle, modal } = props;
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Wallet</ModalHeader>
        <ModalBody>Are sure you do you want delete this item?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Delete
          </Button>{" "}
          <Button color="light" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WalletDeleteModal;
