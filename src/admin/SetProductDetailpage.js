import React, { useEffect } from "react";

import { Card, Button } from "react-bootstrap";
import numeral from "numeral";
import { LinkContainer } from "react-router-bootstrap";
import { getBookById } from "../redux/action/globalActionType";
import { connect } from "react-redux";

const SetBookDetailPage = (props) => {
  console.log(props)
  const { id } = props.match.params;
  const { book } = props;
  const bookStatus = book.bookStatus === "FOR_SELL" ? "info" : "warning";

  useEffect(() => {
    props.getBookById(id);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Card className="pl-0 p-5">
          <div className="row">
            <div className="col-md-3">
              <LinkContainer to="/admin/setProduct" style={{ cursor: "pointer" }}>
                <h2>&larr;</h2>
              </LinkContainer>
            </div>
            <div className="col-md-6">
              <h2 style={{ color: "#8052ff" }}>
                {book.title}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <img
                className="col-md-8"
                variant="top"
                src="https://www.seniberpikir.com/wp-content/uploads/Review-Buku-The-Subtle-Art-of-Not-Giving-a-Fuck-karya-mark-manson-2.jpg"
                alt=""
                width={450}
              />
            </div>
          </div>
          <div className="col-md-4">
            <Button
              variant={bookStatus}
              className="btn-sm font-weight-bold m-2"
            >
              {book.bookStatus}
            </Button>
            <h4 className="my-2 font-weight-bold" style={{ color: "#8052ff" }}>
              {`Rp ${numeral(book.price).format("0,0")}`}
            </h4>
            <h5 className="my-3 text-dark text-left">
              Author: {book.authorName}
            </h5>
            <h6 className="text-left">Book Synopsis:</h6>
            <p className="text-black-50 text-justify">{book.synopsis}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    book: state.bookReducer.book,
    booksInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBookDetailPage);
