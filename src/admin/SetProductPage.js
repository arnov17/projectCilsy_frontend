import React, { useEffect } from "react";
// import "../../App.css";
import Book from "../components/adminComponent/AdminComponent"

import { connect } from "react-redux";
import { getListBook, updateBook, deleteBook } from "../redux/action/globalActionType"

const SetBookPage = (props) => {
  console.log(props)
  useEffect(() => {
    props.getBook();
  }, []);

  const handleUpdate = (data) => {
    props.updateBook(data);
  };

  const handleDelete = (id) => {
    props.deleteBook(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container m-3">
          <h2>Redux-books, Item on cart: {props.bookInCart.length}</h2>
        </div>
        <div className="container">
          <div className="row">
            {props.books &&
              props.books.map((val, key) => (
                <Book
                  key={key}
                  book={val}
                  doUpdate={handleUpdate}
                  doDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: () => dispatch(getListBook()),
    updateBook: (data) => dispatch(updateBook(data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBookPage);
