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
                {book.title}, Item in cart:{" "}
                {props.booksInCart.filter((item) => item.id == id).length}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <img
                className="col-md-8"
                variant="top"
                src="data:image/jpeg;base64,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"
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
