import React from 'react'
import { connect } from "react-redux";
import numeral from "numeral";
import { withRouter } from "react-router";


const PayConfirm = (props) => {
    console.log(props.PriceCart.totalAllProduct)
    const checkPayment = () => {
        if(props.signedUser[0].saldo < props.PriceCart.totalAllProduct) {
            alert('Your Balance is not enought')
        } else if(props.signedUser[0].saldo >= props.PriceCart.totalAllProduct) {
            // props.signedUser[0].saldo - props.PriceCart.totalAllProduct
            props.history.push('/payconfirm/statusPayment')
        }
    }

    
    return (
        <div>
            <h2>Payment Confirm</h2>
            <h3>saldo kamu : {`Rp ${numeral(props.signedUser[0].saldo).format("0,0")}`}</h3>
            <h3>total chekcout : {`Rp ${numeral(props.PriceCart.totalAllProduct).format("0,0")}`}</h3>

            <button type="submit" className="btn btn-primary" onClick={checkPayment} >Payment</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
      signedUser : state.bookReducer.signedUser,
      PriceCart : state.bookReducer.PriceCart
    };
  };
  
  export default connect(mapStateToProps)(withRouter(PayConfirm))