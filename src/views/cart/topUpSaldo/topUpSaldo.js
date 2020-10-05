import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../../../utils/global/index";
import { storageData } from "../../../utils/global/index";

const TopUpSaldo = (props) => {
  const [dataUser, setDataUser] = useState({
    name: "",
    saldo: null,
  });

  const [formTopUp, setTopUp] = useState({
    saldo: "",
  });

  const handleChangeFormTopUp = (event, param) => {
    setTopUp({
      ...formTopUp,
      [param]: event.target.value,
    });
    // console.log(formRegister);
  };

  console.log(formTopUp.saldo);
  console.log(storageData);
  useEffect(() => {
    const getDataUser = async () => {
      const id = storageData.id;
      console.log(id);
      const response = await axios.get(`${ENDPOINT}/auth/read/${id}`);
      // console.log(response);
      setDataUser({
        ...dataUser,
        name: response.data.name,
        saldo: response.data.saldo,
      });
    };
    getDataUser();
  }, []);

  const handleSubmit = async () => {
    const updateSaldoUser = {
      saldo: Number(dataUser.saldo) + Number(formTopUp.saldo),
    };
    console.log(updateSaldoUser);
    let idUser = storageData.id;
    console.log(idUser);
    await axios.patch(`${ENDPOINT}/auth/update`, updateSaldoUser, {
      data: { idUser },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    props.history.push("payconfirm");
  };
  return (
    <div>
      <div className="container m-3">
        <Link to="/payconfirm" style={{ cursor: "pointer" }}>
          <h2>&larr;</h2>
        </Link>
        <Card>
          <Card.Header as="h5">Top Up Saldo</Card.Header>
          <Card.Body>
            <Card.Text>
              Your Balance : {`Rp ${numeral(dataUser.saldo).format("0,0")}`}
            </Card.Text>
          </Card.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Amount Saldo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount Saldo top up"
                value={formTopUp.saldo}
                onChange={(event) => handleChangeFormTopUp(event, "saldo")}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmit}>
            Top Up
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(TopUpSaldo);
