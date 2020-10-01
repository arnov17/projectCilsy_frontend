import React, { Fragment, useEffect, useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";

import { Form, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getBookById } from "../redux/action/globalActionType";
import { connect } from "react-redux";

import axios from "axios";
import { ENDPOINT, access_token } from "../utils/global/index";

const UpdateBook = (props) => {
  // console.log(props);

  const [FormProduct, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
    stock: "",
    category_id: "",
    thumbnail_url: "",
  });
  const [ListCategory, setcategory] = useState({
    category: [],
  });
  // console.log(ListCategory.category.data);

  useEffect(async () => {
    // props.getBookById(id);
    const categories = await axios.get(`${ENDPOINT}/category/read/`);
    if (categories) {
      setcategory({
        category: categories.data || [],
      });
    }

    const id = props.match.params.id;
    const response = await axios.get(`${ENDPOINT}/product/read/${id}`);
    setProduct({
      ...FormProduct,
      title: response.data.title,
      description: response.data.description,
      price: response.data.price,
      author: response.data.author,
      stock: response.data.stock,
      category_id: response.data.category_id,
      thumbnail_url: response.data.category,
    });
  }, []);
  console.log();

  const handlerChange = (event, param) => {
    setProduct({
      ...FormProduct,
      [param]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    // console.log(FormProduct)
    event.preventDefault();
    const id = props.match.params.id;
    console.log(id);
    console.log(FormProduct);
    await axios.patch(`${ENDPOINT}/product/update`, FormProduct, {
      data: { id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    props.history.push("/admin/setProduct");
  };

  // useEffect(() => {
  //   props.getBookById(id);
  // }, []);
  console.log(FormProduct);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
                  src="https://www.seniberpikir.com/wp-content/uploads/Review-Buku-The-Subtle-Art-of-Not-Giving-a-Fuck-karya-mark-manson-2.jpg"
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
                let optionCategory = "";
                optionCategory += `<option value=${val.id}>${val.category_name}</option>`;
                return (
                  <option key={key + 1} value={val.id}>
                    {val.category_name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {/* <Form.Group>
                                <Form.File id="exampleFormControlFile1" method="post" enctype="multipart/form-data" label="File Input Book Image" />
                            </Form.Group> */}

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
