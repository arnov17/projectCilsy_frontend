import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import numeral from "numeral";
import { PriceCart } from "../../redux/action";
import { DataContext } from "../../context/DataContext";
import "./Cart.css";

import axios from "axios";
import { ENDPOINT, access_token, storageData } from "../../utils/global/index";

const Cart = (props) => {
  console.log(props);

  const { dataContext, setDataContext } = useContext(DataContext);
  let carts = dataContext ? dataContext.carts : [];
  console.log(carts);

  const DeleteListCart = (id) => {
    const deleteList =
      dataContext && dataContext.carts.filter((val) => val.id !== id);
    console.log(deleteList);
    setDataContext({ carts: [...deleteList] });
  };

  const handleChangeQty = (e, id) => {
    const findProduct =
      dataContext && dataContext.carts.find((val) => val.id === id);
    findProduct.qty = e.target.value;
    setDataContext({ ...dataContext });
  };

  const handleAjustQty = (type, id) => {
    const findProduct =
      dataContext && dataContext.carts.find((val) => val.id === id);
    const qty = type === "+" ? findProduct.qty + 1 : findProduct.qty - 1;
    findProduct.qty = qty;
    setDataContext({ ...dataContext });
  };

  const minusOrder = (id) => {
    const findProduct =
      dataContext && dataContext.carts.find((val) => val.id === id);
    const qty = findProduct.qty > 1 ? findProduct.qty - 1 : findProduct.qty - 0;
    findProduct.qty = qty;
    setDataContext({ ...dataContext });
  };

  const totalAllProduct = dataContext
    ? dataContext.carts.reduce((a, b) => a + b.price * b.qty, 0)
    : 0;

  const handlerSubmit = async () => {
    try {
      const transaction = {
        amount: totalAllProduct,
      };
      console.log(transaction);
      const createTransaction = await axios.post(
        `${ENDPOINT}/transaction/create`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const getidTransaction = createTransaction.data.data.id;
      localStorage.setItem(
        "saveidTransaction",
        JSON.stringify(getidTransaction)
      );

      dataContext.carts.map((cart, index) => {
        // console.log(cart);
        // console.log(cart.id);
        const createTransactionOrder = async () => {
          const submitOrder = {
            transaction_id: getidTransaction,
            user_id: storageData.id,
            product_id: cart.id,
            price: cart.price,
            total: cart.qty,
            title: cart.title,
            author: cart.author,
            description: cart.description,
          };
          console.log(submitOrder);

          await axios.post(`${ENDPOINT}/order/create`, submitOrder, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
        };
        createTransactionOrder();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!dataContext === 0 ? (
        <div>
          <h1>
            The Cart still Empty, Please Select The Book From Product List
          </h1>
          <h2>Thank You</h2>
        </div>
      ) : (
        <div>
          <h3>Shopping List</h3>
          <div id="cartList">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Delete List</th>
                </tr>
              </thead>
              <tbody>
                {dataContext &&
                  dataContext.carts.map((val, key) => {
                    const subtotal = val.qty * val.price;
                    // console.log(val);
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.title}</td>
                        <td>
                          <button onClick={() => minusOrder(val.id)}>-</button>
                          <input
                            value={val.qty}
                            onChange={(e) => handleChangeQty(e, val.id)}
                          />
                          <button onClick={() => handleAjustQty("+", val.id)}>
                            +
                          </button>
                        </td>
                        <td>{`Rp ${numeral(val.price).format("0,0")}`}</td>
                        <td>{`Rp ${numeral(subtotal).format("0,0")}`}</td>
                        <td onClick={() => DeleteListCart(val.id)}>
                          <Button variant="danger">Delete</Button>{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>

          <h5>Total of carts : {carts.length}</h5>

          <div id="cartSummary">
            <h2>
              Total Price: {`Rp ${numeral(totalAllProduct).format("0,0")}`}
            </h2>
            <Link to="/payconfirm">
              <Button
                variant="primary"
                disabled={totalAllProduct > 0 ? false : true}
                onClick={() => {
                  props.PriceCart({ totalAllProduct });
                  handlerSubmit();
                  // fixOrder();
                }}
              >
                Checkout
              </Button>
            </Link>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDiscpacthProps = (dispatch) => {
  return {
    PriceCart: (data) => dispatch(PriceCart(data)),
  };
};

export default connect(mapStateToProps, mapDiscpacthProps)(Cart);
