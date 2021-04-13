import AppLayout from "./../../layouts/LayoutApp";
import { getSession } from "next-auth/client";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import { getWallets } from "../../common/APICall";
import WalletUpdateModal from "../../common/modules/wallet/WalletUpdateModal";
import WalletDeleteModal from "../../common/modules/wallet/WalletDeleteModal";
import WalletAddModal from "../../common/modules/wallet/WalletAddModal";

export default function MyWallet() {
  const [loading, setLoading] = useState();
  const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const [addModal, setAddModal] = useState(false);
  const addToggle = () => setAddModal(!addModal);

  useMemo(async () => {
    setLoading(true);
    let resWallets = await getWallets();
    if (resWallets) {
      setWallets(resWallets);
    }
    setLoading(false);
  }, []);

  return (
    <AppLayout>
      <div
        className={
          "d-flex container-fluid align-items-center justify-content-between"
        }
      >
        {" "}
        <h4>My Wallet</h4>
        <div>
          <Button
            outline
            color={"primary"}
            className={"mr-3"}
            onClick={() => {
              setAddModal(!addModal);
            }}
          >
            Add Wallet
          </Button>
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col sm={12} md={6} xl={6} lg={6}>
            <ListGroup>
              {wallets.map((walletItem, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    onClick={() => setWallet(walletItem)}
                  >
                    {" "}
                    {walletItem.name}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>

          {wallet && (
            <Col sm={12} md={6} xl={6} lg={6}>
              <Card>
                <CardBody>
                  <div className={"d-flex justify-content-between"}>
                    <div>
                      <i
                        className="fa fa-times pl-2 pr-2"
                        aria-hidden="true"
                        onClick={() => setWallet(null)}
                      ></i>
                      Wallet Details
                    </div>
                    <div className={"d-flex justify-content-space"}>
                      <Button
                        outline
                        color={"danger"}
                        className={"mr-3"}
                        onClick={() => {
                          setDeleteModal(!deleteModal);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        outline
                        color={"primary"}
                        onClick={() => {
                          setModal(!modal);
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className={"detail-container"}>
                    <div className={"d-flex wallet-detail-content p-2"}>
                      <img
                        src={"https://static.moneylover.me/img/icon/icon.png"}
                        width={56}
                        height={56}
                        alt={"wallet detail icon"}
                      />
                      <div className={"ml-2 content"}>
                        <h5>{wallet.name}</h5>
                        <h6>India Rupee</h6>
                      </div>
                    </div>

                    <div className={"list-users p-2"}>
                      <div>
                        <span>Users</span>
                      </div>
                      <div
                        className={
                          "d-flex user justify-content-space align-items-center"
                        }
                      >
                        <div
                          style={{
                            flex: 0.1
                          }}
                        >
                          <img
                            src={
                              "https://static.moneylover.me/img/icon/icon.png"
                            }
                            width={40}
                            height={40}
                            alt={"wallet detail icon"}
                          />
                        </div>
                        <div
                          style={{
                            flex: 0.8
                          }}
                        >
                          <div> {wallet.owner_id} </div>
                          <div> {wallet.created_at} </div>
                        </div>
                        <div
                          style={{
                            flex: 0.1,
                            display: "none"
                          }}
                        >
                          <i
                            className="fa fa-times pl-2 pr-2"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
      <WalletUpdateModal modal={modal} toggle={toggle} />
      <WalletDeleteModal modal={deleteModal} toggle={deleteToggle} />
      <WalletAddModal modal={addModal} toggle={addToggle} />
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?return=wallet"
      }
    };
  }

  return {
    props: {
      user: session
    }
  };
}
