import React from 'react'
import {NavLink} from 'react-router-dom'
import {NavbarStyled} from './NavbarStyle'

import {connect} from 'react-redux'

const Navbar = (props) => {
  return (
    <NavbarStyled>
      <ul>
        <li><NavLink to="/homepage">Homepage</NavLink></li>
        <li><NavLink to="/">Sign In / Register</NavLink></li>
        <li><NavLink to="/product">product</NavLink></li>
        <li><NavLink to="/cart">Cart <span>{props.bookInCart.length}</span></NavLink></li>
      </ul>
    </NavbarStyled>
  )
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
  };
};


export default connect(mapStateToProps)(Navbar)