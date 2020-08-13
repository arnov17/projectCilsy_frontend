import React from 'react'
import {connect} from 'react-redux'
import actionType from '../../redux/reducer/globalActionType'

const ButtonCounter = (props) => {
    return (
        <div>
             <button className="plus" onClick={props.handlePlus}>addToCart</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        order : state.totalOrder
    }
}

const mapDiscpacthProps = (dispatch) => {
    return {
        handlePlus : () => dispatch({type : actionType.PLUS_ORDER}),
    }
}

export default connect(mapStateToProps, mapDiscpacthProps)(ButtonCounter)