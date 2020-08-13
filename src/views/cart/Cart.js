import React, { useState }  from 'react'
// import Button from '../../components/button/buttonAddToCart'
import { connect } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import {Table, Button, Card} from 'react-bootstrap'
import numeral from "numeral";
import {handleMinus, handlePlus, PriceCart} from "../../redux/action"
import './Cart.css'


const Cart = (props) => {
  console.log(props)
  // console.log(props.bookInCart)

  const totalAllProduct = props.bookInCart.reduce((a, b) => a + (b.price * props.totalOrder), 0)

  // const DeleteListCart = (id) => {
  //   let listcart = props.bookInCart
  //   const deleteList = props.bookInCart((val) => val.id !== id) {
  //   listcart = deleteList
  //   }
  // }

  return (
    <div>
      {props.bookInCart.length === 0 ? (
        <div>
          <h1>The Cart still Empty, Please Select The Book From Product List</h1>
          <h2>Thank You</h2>
        </div>
      ) : (
        <div>

      <h2>Daftar Keranjang</h2>
            <div id="cartList">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {props.bookInCart && props.bookInCart.map((val, key) => {
                  const subtotal = props.totalOrder * val.price
                  // console.log(val)
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.title}</td>
                        <td>
                        <button onClick={() => props.handleMinus(val.id)}>-</button>
                        <p>{val.qty}</p>
                          <input 
                            value={val.qty} 
                            // onChange={(e) => handleChangeQty(e, val.id)}
                          />
                        <button onClick={() => props.handlePlus(val.id)}>+</button>
                        </td>
                        <td>{`Rp ${numeral(val.price).format("0,0")}`}</td>
                        <td>{`Rp ${numeral(subtotal).format("0,0")}`}</td>
                        <td><Button variant="danger">Delete</Button> </td>
                      </tr>
                    )
                })}
                </tbody>
              </Table>
            </div>

            <h2>Number of carts : {props.bookInCart.length}</h2>
          

          <div id="cartSummary">
            <h2>Total Price: {`Rp ${numeral(totalAllProduct).format("0,0")}`}</h2>
            <Link to="/payconfirm">
              <Button variant="primary"
              disabled={totalAllProduct > 0 ? false : true}
              onClick={() =>
                props.PriceCart({totalAllProduct})
                }
                >Checkout
              </Button>
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
    totalOrder : state.bookReducer.totalOrder
  };
};

const mapDiscpacthProps = (dispatch) => {
  return {
      handlePlus : (bookId) => dispatch(handlePlus(bookId)),
      handleMinus : (bookId) => dispatch(handleMinus(bookId)),
      PriceCart : (data) => dispatch(PriceCart(data))

  }
}


export default connect(mapStateToProps, mapDiscpacthProps)(Cart)