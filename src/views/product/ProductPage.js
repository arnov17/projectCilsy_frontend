import React, { useEffect, useState } from "react";
import "../../App.css";
import Book from "../../components/product/Product";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListBook } from "../../redux/action/globalActionType";
import Footer from "../../components/footer/Footer";

import { Pagination } from "react-bootstrap";

const BookPage = (props) => {
  // console.log(props.books.rows);
  const TotalBooks = props.books.count;
  // console.log(ListBooks.Books.rows);
  const [currentPage, setCurentPage] = useState(1);
  // console.log(currentPage);
  useEffect(() => {
    props.getBook(currentPage);
  }, [currentPage]);

  //change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    setCurentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalBooks / 3); i++) {
    pageNumbers.push(i);
  }
  const lastPage = Math.ceil(TotalBooks / 3);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container m-3">
          <h1>Book List</h1>
        </div>
        <div className="container">
          <div className="row">
            {props.books.rows &&
              props.books.rows.map((val, key) => <Book key={key} book={val} />)}
          </div>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <Link
                to={`/product?pages=${1}`}
                onClick={() => paginate(1)}
                className="page-link"
              >
                Firts
              </Link>
            </li>
            <li className="page-item">
              <Link
                to={`/product?pages=${currentPage - 1}`}
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <Link
                  to={`/product?pages=${number}`}
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                to={`/product?pages=${currentPage + 1}`}
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                next
              </Link>
            </li>
            <li className="page-item">
              <Link
                to={`/product?pages=${lastPage}`}
                onClick={() => paginate(lastPage)}
                className="page-link"
              >
                Last
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (currentPage) => dispatch(getListBook(currentPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
