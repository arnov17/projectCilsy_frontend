import React, { useState, useEffect, useContext } from "react";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";

import { connect } from "react-redux";
// import { addToCart } from "../../redux/action/globalActionType"
import { DataContext } from "../../context/DataContext";
import "./Product.css";

const Book = (props) => {
  const { book } = props;
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      ...book,
      id: book.id,
      title: book.title,
      description: book.description,
      price: book.price,
      author: book.author,
    });
  }, []);

  // console.log(book)
  // mengunakan context
  const { dataContext, setDataContext } = useContext(DataContext);
  const addToCart = (id) => {
    let carts = dataContext ? dataContext.carts : [];
    const index = carts.findIndex((val) => val.id === id);
    if (index >= 0) {
      carts[index].qty = carts[index].qty + 1;
    } else if (book.id === id) {
      carts.push({ ...book, qty: 1 });
    }
    // console.log(carts)
    setDataContext({
      ...dataContext,
      carts,
    });
  };

  return (
    <div id="cartProduct" className="col-md-4">
      <Card id="cartBody">
        <Card.Img
          variant="top"
          src={
            book.thumbnail_url && "http://localhost:6003" + book.thumbnail_url
          }
        />

        <Card.Body>
          <LinkContainer
            to={`/product/${book.id}`}
            style={{ cursor: "pointer" }}
          >
            <Card.Title>
              <h2 className="text-primary">{book.title}</h2>
            </Card.Title>
          </LinkContainer>
          <h4 className="text-dark">Author: {book.author}</h4>
          <Card.Text className="text-secondary text-justify">
            <p>{data.description}</p>
          </Card.Text>
          <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
            {`Rp ${numeral(book.price).format("0,0")}`}
          </h4>
          <Button onClick={() => addToCart(book.id)}>Add to cart</Button>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (book) => dispatch(addToCart(book)),
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withRouter(Book));
