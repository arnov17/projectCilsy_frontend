import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { updateSaldo } from "../../../redux/action";
import { Card, Button } from "react-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../../../utils/global/index";
import { storageData } from "../../../utils/global/index";

import { DataContext } from "../../../context/DataContext";

const PayConfirm = (props) => {
  console.log(props.PriceCart.totalAllProduct);
  const { dataContext, setDataContext } = useContext(DataContext);
  const [dataUser, setDataUser] = useState({
    name: "",
    saldo: "",
  });

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

  const checkPayment = async () => {
    let idTransaction = JSON.parse(localStorage.getItem("saveidTransaction"));
    console.log(idTransaction);
    if (dataUser.saldo < props.PriceCart.totalAllProduct) {
      alert("Your Balance is not enought");
    } else if (dataUser.saldo >= props.PriceCart.totalAllProduct) {
      const updateTransaction = {
        status: "SUCCESS",
      };
      await axios.patch(`${ENDPOINT}/transaction/update`, updateTransaction, {
        data: { idTransaction },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const updatesaldo = {
        saldo: Number(dataUser.saldo) - Number(props.PriceCart.totalAllProduct),
      };

      let idUser = storageData.id;

      await axios.patch(`${ENDPOINT}/auth/update`, updatesaldo, {
        data: { idUser },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log(dataUser.saldo - props.PriceCart.totalAllProduct);
      setDataContext({
        ...dataContext,
        carts: [],
      });

      localStorage.removeItem("saveidTransaction");
      props.history.push("/payconfirm/statusPayment");
    }

    // await axios.post(`${ENDPOINT}/order/create`, listOrder, {
    //   data: { id },
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // });
  };

  return (
    <div>
      <div className="container m-3">
        <Link to="/cart" style={{ cursor: "pointer" }}>
          <h2>&larr;</h2>
        </Link>
        <Card>
          <Card.Header as="h5">Payment Confirm</Card.Header>
          <Card.Body>
            <Card.Title>
              Total Price :{" "}
              {`Rp ${numeral(props.PriceCart.totalAllProduct).format("0,0")}`}
            </Card.Title>
            <Card.Text>
              Your Balance : {`Rp ${numeral(dataUser.saldo).format("0,0")}`}
            </Card.Text>
            <Button variant="primary" onClick={checkPayment}>
              Payment
            </Button>
          </Card.Body>
        </Card>
        <br></br>
        <Card>
          <Card.Body>
            <Card.Title>Top Up Saldo</Card.Title>
            <Card.Text>Click below to update Saldo</Card.Text>
            <Link to="/topupsaldo" style={{ cursor: "pointer" }}>
              <Button variant="primary">Top Up</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signedUser: state.bookReducer.signedUser,
    PriceCart: state.bookReducer.PriceCart,
  };
};

const mapDiscpacthProps = (dispatch) => {
  return {
    updateSaldo: (data) => dispatch(updateSaldo(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDiscpacthProps
)(withRouter(PayConfirm));
