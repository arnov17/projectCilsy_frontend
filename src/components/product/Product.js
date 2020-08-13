import React, { useState, useEffect } from "react";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";

import { connect } from "react-redux";
import { addToCart } from "../../redux/action/globalActionType"
import "./Product.css"

const Book = (props) => {
  const { book, addToCart } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      ...book,
      bookCategory: { ...book.bookCategory },
      id: book.id,
      title: book.title,
      synopsis: book.synopsis,
      price: book.price,
      bookStatus: book.bookStatus,
      authorName: book.authorName,
      publicationDate: new Date(),
    });
  }, []);

  return (
    <div id="cartProduct"className="col-md-4">
      <Card id="cartBody">
        <Card.Img
          variant="top"
          src={"https://www.seniberpikir.com/wp-content/uploads/Review-Buku-The-Subtle-Art-of-Not-Giving-a-Fuck-karya-mark-manson-2.jpg"}
        />

        <Card.Body>
          <LinkContainer to={`/product/${book.id}`} style={{ cursor: "pointer" }}>
            <Card.Title>
              <h2 className="text-primary">{book.title}</h2>
            </Card.Title>
          </LinkContainer>
          <h4 className="text-dark">Author: {book.authorName}</h4>
          <Card.Text className="text-secondary text-justify">
            <p>{data.synopsis}</p>
          </Card.Text>
            <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
              {`Rp ${numeral(book.price).format("0,0")}`}
            </h4>
          <Button onClick={() => addToCart(book)}>Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => dispatch(addToCart(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));
