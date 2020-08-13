import React, { useEffect } from "react";
import "../../App.css";
import { Button} from "react-bootstrap";
import numeral from "numeral";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { getBookById } from "../../redux/action/globalActionType";
import { addToCart } from "../../redux/action/globalActionType"
import { connect } from "react-redux";
import "./DetailPage.css"

const BookDetailPage = (props) => {
  console.log(props)
  const { id } = props.match.params;
  const { book, addToCart } = props;

  useEffect(() => {
    props.getBookById(id);
  }, []);

  return (
    <div className="App">
        <Link to="/product" style={{ cursor: "pointer" }}>
          <Button className="primary">Back</Button>
                      {/* <h2>&larr;</h2> */}
        </Link>
        <section class="contain-detail-book">
                <div class="flex-container-1">
                  <div id = "left-container-1">
                      <img id="myImg" src="https://www.seniberpikir.com/wp-content/uploads/Review-Buku-The-Subtle-Art-of-Not-Giving-a-Fuck-karya-mark-manson-2.jpg" alt="Sebuah-Seni-Untuk-Bersikap-Bodo-Amat."></img>

                      <div id="myModal" class="modal">
                          <span class="close">X</span>
                          <img class="modal-content" id="img01"></img>
                      </div>
                      <div class="share-container">
                          <span >Share: 
                              <a href=""><img class="share-icon"  src="./img/facebook-9.svg" alt=""></img></a>
                              <a href=""><img class="share-icon"  src="./img/twitter-5.svg" alt=""></img></a>
                              <a href=""><img class="share-icon"  src="./img/group-9.svg" alt=""></img></a>
                          </span>
                      </div>
                      
                  </div>

                  <div id="middle-container-1">
                      <span class="book-title">
                        <h1> {book.title}</h1>
                      </span>

                    <h2>Author : {book.authorName}</h2>

                    <div class="tab">
                        <button class="tablinks active" onclick="openTabs(event, 'Deskripsi')">Deskripsi</button>
                        <button class="tablinks" onclick="openTabs(event, 'Detail')">Detail</button>
                      </div>

                      <div id="Deskripsi" class="tabcontent">
                        <p>{book.synopsis}</p>
                      </div>

                      <div id="Detail" class="tabcontent">
                        <p>Jumlah Halaman : 256</p>
                        <p>Bahasa         : Indonesia</p>
                        <p>Penerbit       : Gramedia Widiasarana Indonesia</p>
                      </div>
                  </div>

                  <div id ="right-container-1">
                      <div class="box-price">
                          <div class="box-content">
                              <div id="box-content-text">
                                  <span class="box-price-text-1">Soft Cover</span>
                                  <span class="text-i">i</span>
                              </div>
                              <p class="box-price-text-2">{`Rp ${numeral(book.price).format("0,0")}`}</p>
                          </div>
                      </div>
                      <div class="btn">
                          <button class="btn-wishlist" onClick={() => addToCart(book)}>ADD WISHLIST</button>
                          <Link to="/cart">
                            <button class="btn-beli" onClick={() => addToCart(book)}>BUY NOW</button>
                          </Link>
                      </div>

                      <div class="asurance-info">
                          <p><img id="img-asurance" src="./img/insurance.png" alt=""></img><strong>Available </strong>shipping insurance. <span class="text-i-2">i</span></p>
                      </div>
                  </div>
        </div>

    </section>
    <script src="./index.js"></script>
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
    addToCart: (book) => dispatch(addToCart(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
