import React, { useEffect, useContext, useState } from "react";
import "../../App.css";
import numeral from "numeral";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { getBookById } from "../../redux/action/globalActionType";
// import { addToCart } from "../../redux/action/globalActionType"
import { connect } from "react-redux";
import { DataContext } from "../../context/DataContext";
import "./DetailPage.css";

import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/global/index";

const BookDetailPage = (props) => {
  console.log(props);
  const { id } = props.match.params;
  // const { book } = props;

  const [DetailProduct, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    author: "",
    stock: "",
    category_id: "",
    thumbnail_url: "",
  });
  console.log(DetailProduct);

  useEffect(() => {
    // props.getBookById(id);
    const getBookbyId = async () => {
      const response = await axios.get(`${ENDPOINT}/product/read/${id}`);
      console.log(response);
      setProduct({
        ...DetailProduct,
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        author: response.data.author,
        stock: response.data.stock,
        category_id: response.data.category_id,
        thumbnail_url: response.data.thumbnail_url,
      });
    };
    getBookbyId();
  }, []);

  const { dataContext, setDataContext } = useContext(DataContext);
  const addToCart = (id) => {
    let carts = dataContext ? dataContext.carts : [];
    console.log(carts);
    const index = carts.findIndex((val) => val.id === id);
    if (index >= 0 && carts[index].id === DetailProduct.id) {
      carts[index].qty = carts[index].qty + 1;
    } else if (DetailProduct.id === id) {
      carts.push({ ...DetailProduct, qty: 1 });
    }
    console.log(carts);
    setDataContext({
      ...dataContext,
      carts,
    });
  };

  return (
    <div className="App">
      <Link to="/product" style={{ cursor: "pointer" }}>
        <h2>&larr;</h2>
      </Link>
      <section class="contain-detail-book">
        <div class="flex-container-1">
          <div id="left-container-1">
            <img
              id="myImg"
              src={
                DetailProduct.thumbnail_url &&
                "http://localhost:6003" + DetailProduct.thumbnail_url
              }
              alt="Sebuah-Seni-Untuk-Bersikap-Bodo-Amat."
            ></img>

            <div id="myModal" class="modal">
              <span class="close">X</span>
              <img class="modal-content" id="img01"></img>
            </div>
            <div class="share-container">
              <span>
                Share:
                <a href="">
                  <img
                    class="share-icon"
                    src="./img/facebook-9.svg"
                    alt=""
                  ></img>
                </a>
                <a href="">
                  <img
                    class="share-icon"
                    src="./img/twitter-5.svg"
                    alt=""
                  ></img>
                </a>
                <a href="">
                  <img class="share-icon" src="./img/group-9.svg" alt=""></img>
                </a>
              </span>
            </div>
          </div>

          <div id="middle-container-1">
            <span class="book-title">
              <h2> {DetailProduct.title}</h2>
            </span>

            <h4>Author : {DetailProduct.author}</h4>

            <div class="tab">
              <button
                class="tablinks active"
                onclick="openTabs(event, 'Deskripsi')"
              >
                Deskripsi
              </button>
              <button class="tablinks" onclick="openTabs(event, 'Detail')">
                Detail
              </button>
            </div>

            <div id="Deskripsi" class="tabcontent">
              <p>{DetailProduct.description}</p>
            </div>

            <div id="Detail" class="tabcontent">
              <p>Jumlah Halaman : 256</p>
              <p>Bahasa : Indonesia</p>
              <p>Penerbit : Gramedia Widiasarana Indonesia</p>
            </div>
          </div>

          <div id="right-container-1">
            <div class="box-price">
              <div class="box-content">
                <div id="box-content-text">
                  <span class="box-price-text-1">Soft Cover</span>
                  <span class="text-i">i</span>
                </div>
                <p class="box-price-text-2">{`Rp ${numeral(
                  DetailProduct.price
                ).format("0,0")}`}</p>
              </div>
            </div>
            <div class="btn">
              <button
                class="btn-wishlist"
                onClick={() => addToCart(DetailProduct.id)}
              >
                ADD WISHLIST
              </button>
              <Link to="/cart">
                <button
                  class="btn-beli"
                  onClick={() => addToCart(DetailProduct.id)}
                >
                  BUY NOW
                </button>
              </Link>
            </div>

            <div class="asurance-info">
              <p>
                <img id="img-asurance" src="./img/insurance.png" alt=""></img>
                <strong>Available </strong>shipping insurance.{" "}
                <span class="text-i-2">i</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // book: state.bookReducer.book,
    // booksInCart: state.bookReducer.booksInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getBookById: (id) => dispatch(getBookById(id)),
    // addToCart: (book) => dispatch(addToCart(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
