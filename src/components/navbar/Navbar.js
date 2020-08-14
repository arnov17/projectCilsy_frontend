import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {NavbarStyled} from './NavbarStyle'

import {connect} from 'react-redux'
import {DataContext} from '../../context/DataContext'

const Navbar = (props) => {
  //use context
  const {dataContext} = useContext(DataContext)
  const totalCart = dataContext ? dataContext.carts.length : 0
  return (
    <NavbarStyled>
      <ul>
        <li><NavLink to="/Cilsy">Cilsy</NavLink></li>
        <li><NavLink to="/category">Category</NavLink></li>
        <li><NavLink to="/homepage">Homepage</NavLink></li>
        <li><NavLink to="/">Sign In / Register</NavLink></li>
        <li><NavLink to="/product">product</NavLink></li>
        <li><NavLink to="/cart">Cart <span>{totalCart}</span></NavLink></li>
      </ul>
    </NavbarStyled>
  )
}

// use 
const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
  };
};


export default connect(mapStateToProps)(Navbar)