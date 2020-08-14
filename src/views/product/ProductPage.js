import React, { useEffect } from "react";
import "../../App.css";
import Book from "../../components/product/Product"

import { connect } from "react-redux";
import { getListBook} from "../../redux/action/globalActionType"
import Footer from "../../components/footer/Footer"

const BookPage = (props) => {
  // console.log(props)
  useEffect(() => {
    props.getBook();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container m-3">
          <h1>Book List</h1>
        </div>
        <div className="container">
          <div className="row">
            {props.books &&
              props.books.map((val, key) => (
                <Book
                  key={key}
                  book={val}
                />
              ))}
          </div>
        </div>
      </header>
      <Footer/>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
