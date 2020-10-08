import React, { Fragment, useEffect, useState, useCallback } from "react";

import { Form, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getBookById } from "../redux/action/globalActionType";
import { connect } from "react-redux";

import axios from "axios";
import { ENDPOINT, access_token } from "../utils/global/index";

const UpdateBook = (props) => {
  // console.log(props);

  const [FormImage, setFormImage] = useState({
    file: null,
  });

  const onChangeImage = (e) => {
    setFormImage({ file: e.target.files[0] });
  };

  console.log(FormImage);

  const [FormProduct, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
    stock: "",
    category_id: "",
    // thumbnail_url: "",
  });
  console.log(FormProduct);
  const [ListCategory, setcategory] = useState({
    category: [],
  });

  useEffect(() => {
    // props.getBookById(id);
    const getcategory = async () => {
      const categories = await axios.get(`${ENDPOINT}/category/read/`);
      if (categories) {
        setcategory({
          category: categories.data || [],
        });
      }
    };

    const getProductList = async () => {
      const id = props.match.params.id;
      const response = await axios.get(`${ENDPOINT}/product/read/${id}`);
      console.log(response);
      setProduct({
        ...FormProduct,
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        author: response.data.author,
        stock: response.data.stock,
        category_id: response.data.category_id,
        thumbnail_url: response.data.thumbnail_url,
      });
    };
    getcategory();
    getProductList();
  }, []);

  const handlerChange = (event, param) => {
    setProduct({
      ...FormProduct,
      [param]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    // console.log(FormProduct)
    event.preventDefault();
    // const newFormProduct = new FormData();
    // newFormProduct.append("title", FormProduct.title);
    // newFormProduct.append("description", FormProduct.description);
    // newFormProduct.append("price", FormProduct.price);
    // newFormProduct.append("author", FormProduct.author);
    // newFormProduct.append("stock", FormProduct.stock);
    // newFormProduct.append("category_id", FormProduct.category_id);
    // newFormProduct.append("fileThumbnail", FormImage.file);
    const id = props.match.params.id;
    console.log(id);
    // console.log(newFormProduct);
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //     "content-type": "multipart/form-data",
    //   },
    // };
    await axios.patch(`${ENDPOINT}/product/update`, FormProduct, {
      data: { id },
      headers: {
        Authorization: `Bearer ${access_token}`,
        // "content-type": "multipart/form-data",
      },
    });

    props.history.push("/admin/setProduct");
  };

  // useEffect(() => {
  //   props.getBookById(id);
  // }, []);

  return (
    <Fragment>
      <div className="App">
        <div className="container">
          <Card className="pl-0 p-5">
            <div className="row">
              <div className="col-md-3">
                <LinkContainer
                  to="/admin/setProduct/"
                  style={{ cursor: "pointer" }}
                >
                  <h2>&larr;</h2>
                </LinkContainer>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <img
                  className="col-md-8"
                  variant="top"
                  src={
                    FormProduct.thumbnail_url &&
                    "http://localhost:6003" + FormProduct.thumbnail_url
                  }
                  alt=""
                  width={150}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Form method="post">
        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">
            Book Title
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Entry Book Titke"
            value={FormProduct.title}
            onChange={(event) => handlerChange(event, "title")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="Author"
            value={FormProduct.author}
            onChange={(event) => handlerChange(event, "author")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">Price</Form.Label>
          <Form.Control
            type="integer"
            name="price"
            placeholder="Price Book"
            value={FormProduct.price}
            onChange={(event) => handlerChange(event, "price")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">
            Description
          </Form.Label>
          <Form.Control
            t
            type="text"
            placeholder="Book's Description"
            value={FormProduct.description}
            onChange={(event) => handlerChange(event, "description")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">Stock</Form.Label>
          <Form.Control
            t
            type="text"
            placeholder="Stock"
            value={FormProduct.stock}
            onChange={(event) => handlerChange(event, "stock")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose the Category</Form.Label>
          <Form.Control
            as="select"
            value={FormProduct.category_id}
            onChange={(event) => handlerChange(event, "category_id")}
          >
            {ListCategory.category.data &&
              ListCategory.category.data.map((val, key) => {
                // console.log(val);
                return (
                  <option key={key + 1} value={val.id}>
                    {val.category_name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        {/* <form method="POST" encType="multipart/form-data">
          <input type="file" name="myImage" onChange={onChangeImage} />
        </form> */}

        <Button
          variant="primary"
          type="submit"
          onClick={handlerSubmit}
          style={{ cursor: "pointer" }}
        >
          Save
        </Button>
      </Form>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBook);
