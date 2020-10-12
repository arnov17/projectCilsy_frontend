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
  const [ListBooks, setListBook] = useState({
    Books: [],
  });
  const TotalBooks = ListBooks.Books.count;
  console.log(ListBooks.Books.rows);
  const [currentPage, setCurentPage] = useState(1);
  console.log(currentPage);

  useEffect(() => {
    // props.getBook();
    const getProductList = async () => {
      let pageCurrent = 2;
      const response = await axios.get(
        `${ENDPOINT}/product/read?page=${currentPage}`
      );
      if (response) {
        setListBook({
          Books: response.data.data || [],
        });
      }
      // console.log(response.data.data);
    };
    getProductList();
  }, []);

  //change page
  const paginate = (pageNumber) => setCurentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalBooks / 3); i++) {
    pageNumbers.push(i);
  }

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
            {/* {props.books &&
              props.books.map((val, key) => (
                <Book
                  key={key}
                  book={val}
                  doUpdate={handleUpdate}
                  doDelete={handleDelete}
                  // refresh={props.getBook()}
                />
              ))} */}

            {ListBooks.Books.rows &&
              ListBooks.Books.rows.map((val, key) => (
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
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  // href=""
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
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
    getBook: () => dispatch(getListBook()),
    updateBook: (data) => dispatch(updateBook(data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBookPage);
