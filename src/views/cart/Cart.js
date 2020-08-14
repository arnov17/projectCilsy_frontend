import React, {useContext} from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Table, Button} from 'react-bootstrap'
import Footer from "../../components/footer/Footer";
import numeral from "numeral";
import {PriceCart} from "../../redux/action"
import {DataContext} from '../../context/DataContext'
import './Cart.css'

const Cart = (props) => {
  // console.log(props)

  const {dataContext, setDataContext} = useContext(DataContext)
  // console.log(dataContext.carts);

  const DeleteListCart = (id) => {
    const deleteList = dataContext && dataContext.carts.filter((val) => val.id !== id)
    console.log(deleteList)
    setDataContext({carts : [...deleteList]})
    }

  const handleChangeQty = (e, id) => {
    const findProduct = dataContext && dataContext.carts.find((val) => val.id === id)
    findProduct.qty = e.target.value
    setDataContext({...dataContext})
  }

  const handleAjustQty = (type, id) => {
    const findProduct = dataContext && dataContext.carts.find((val) => val.id === id)
    const qty = type === '+' ? findProduct.qty + 1 :  findProduct.qty - 1
    findProduct.qty = qty
    setDataContext({...dataContext})
  }

  const minusOrder = (id) => {
    const findProduct = dataContext && dataContext.carts.find((val) => val.id === id)
    const qty = findProduct.qty > 1 ? findProduct.qty - 1 : findProduct.qty - 0
    findProduct.qty = qty
    setDataContext({...dataContext})
  }

  const totalAllProduct = dataContext 
  ? dataContext.carts.reduce((a, b) => a + (b.price * b.qty), 0)
  : 0

  return (
    <div>
      {!dataContext === 0 ? (
        <div>
          <h1>The Cart still Empty, Please Select The Book From Product List</h1>
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
                {dataContext && dataContext.carts.map((val, key) => {
                  const subtotal = val.qty * val.price
                  console.log(val)
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
                        <button onClick={() => handleAjustQty('+', val.id)}>+</button>
                        </td>
                        <td>{`Rp ${numeral(val.price).format("0,0")}`}</td>
                        <td>{`Rp ${numeral(subtotal).format("0,0")}`}</td>
                        <td onClick={() => DeleteListCart(val.id)}><Button variant="danger">Delete</Button> </td>
                      </tr>
                    )
                })}
                </tbody>
              </Table>
            </div>

            <h5>Total of carts : {dataContext.carts.length}</h5>
          

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

          <Footer/>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDiscpacthProps = (dispatch) => {
  return {
      PriceCart : (data) => dispatch(PriceCart(data))
  }
}


export default connect(mapStateToProps, mapDiscpacthProps)(Cart)