import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import IconModal from "../modals/IconModal";
import { Formik } from "formik";
import CurrencyModal from "../modals/CurrencyModal";

const WalletAddModal = (props) => {
  const { buttonLabel, className, toggle, modal } = props;

  const [nestedModal, setNestedModal] = useState(false);
  const [nestedCurrencyModal, setNestedCurrencyModal] = useState(false);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };
  const toggleNestedCurrency = () => {
    setNestedCurrencyModal(!nestedCurrencyModal);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Wallet</ModalHeader>
        <ModalBody>
          <Form>
            <Row form className={"align-items-center"}>
              <Col md={3}>
                <FormGroup
                  className={"d-flex align-items-center"}
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={toggleNested}
                >
                  <img
                    src={"https://static.moneylover.me/img/icon/icon.png"}
                    width={50}
                    height={50}
                    alt={"wallet detail icon"}
                  />
                  <i className="fa fa-chevron-down ml-1"></i>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="wallet_name"
                    placeholder={"Wallet Name"}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form className={"align-items-center"}>
              <Col md={7}>
                <FormGroup
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={toggleNestedCurrency}
                >
                  <label>Currency</label>
                  <div>
                    <img
                      src={"https://static.moneylover.me/img/icon/icon.png"}
                      width={25}
                      height={25}
                      alt={"wallet detail icon"}
                    />
                    <span className={"ml-1 mr-2"}>Selct Currency</span>
                    <i className="fa fa-chevron-down"></i>
                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Input
                    type="text"
                    name="initial_amount"
                    id="initial_amount"
                    placeholder={"Initial Amount"}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <CurrencyModal
            modal={nestedCurrencyModal}
            toggle={toggleNestedCurrency}
          />
          <IconModal modal={nestedModal} toggle={toggleNested} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="light" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WalletAddModal;
