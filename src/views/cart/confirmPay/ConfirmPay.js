import React from 'react'
import { connect } from "react-redux";
import numeral from "numeral";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {updateSaldo} from "../../../redux/action"
import {Card, Button} from 'react-bootstrap'


const PayConfirm = (props) => {
    console.log(props.PriceCart.totalAllProduct)
    const checkPayment = () => {
        if(props.signedUser[0].saldo < props.PriceCart.totalAllProduct) {
            alert('Your Balance is not enought')
        } else if(props.signedUser[0].saldo >= props.PriceCart.totalAllProduct) {
            props.history.push('/payconfirm/statusPayment')
            console.log(props.signedUser[0].saldo - props.PriceCart.totalAllProduct)
        }
    }
    
    return (
        <div>
            <div className="container m-3">
                <Link to="/cart" style={{ cursor: "pointer" }}>
                        <h2>&larr;</h2>
                </Link>
                <Card>
                    <Card.Header as="h5">Payment Confirm</Card.Header>
                    <Card.Body>
                        <Card.Title>Total Price : {`Rp ${numeral(props.PriceCart.totalAllProduct).format("0,0")}`}</Card.Title>
                        <Card.Text>
                        Your Balance : {`Rp ${numeral(props.signedUser[0].saldo).format("0,0")}`}
                        </Card.Text>
                        <Button variant="primary" onClick={checkPayment}>Payment</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
      signedUser : state.bookReducer.signedUser,
      PriceCart : state.bookReducer.PriceCart
    };
  };

const mapDiscpacthProps = (dispatch) => {
    return {
        updateSaldo : (data) => dispatch(updateSaldo(data))
    }
  }
  
  export default connect(mapStateToProps, mapDiscpacthProps)(withRouter(PayConfirm))