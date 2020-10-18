import React, { useEffect, useState } from "react";
// import "../../App.css";
import Book from "../components/adminComponent/AdminComponent";
import { LinkContainer } from "react-router-bootstrap";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getListBook,
  updateBook,
  deleteBook,
} from "../redux/action/globalActionType";
import Footer from "../components/footer/Footer";

import axios from "axios";
import { ENDPOINT } from "../utils/global/index";

const SetBookPage = (props) => {
  console.log(props.books);
  const limit = props.books.limit;
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
    } else if (pageNumber > lastPage) {
      pageNumber = lastPage;
    }
    setCurentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalBooks / limit); i++) {
    pageNumbers.push(i);
  }
  const lastPage = Math.ceil(TotalBooks / limit);

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
          <LinkContainer
            to="/admin/setCategoryPage"
            style={{ cursor: "pointer" }}
          >
            {/* <h2>&larr;</h2> */}
            <button>Category</button>
          </LinkContainer>

          <br></br>
          <h2 style={{ color: "black" }}>books List</h2>
          <LinkContainer to="/admin/addBook" style={{ cursor: "pointer" }}>
            {/* <h2>&larr;</h2> */}
            <button>Submit New Book</button>
          </LinkContainer>
        </div>
        <div className="container">
          <div className="row">
            {props.books.rows &&
              props.books.rows.map((val, key) => (
                <Book
                  key={key}
                  book={val}
                  doUpdate={handleUpdate}
                  doDelete={handleDelete}
                  // refresh={props.getBook()}
                />
              ))}
          </div>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <Link
                to={`/admin/setProduct?pages=${1}`}
                onClick={() => paginate(1)}
                className="page-link"
              >
                Firts
              </Link>
            </li>
            <li className="page-item">
              <Link
                to={`/admin/setProduct?pages=${currentPage - 1}`}
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <Link
                  to={`/admin/setProduct?pages=${number}`}
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                to={`/admin/setProduct?pages=${currentPage + 1}`}
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                next
              </Link>
            </li>
            <li className="page-item">
              <Link
                to={`/admin/setProduct?pages=${lastPage}`}
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
  return {
    books: state.bookReducer.books,
    bookInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (currentPage) => dispatch(getListBook(currentPage)),
    updateBook: (data) => dispatch(updateBook(data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBookPage);
