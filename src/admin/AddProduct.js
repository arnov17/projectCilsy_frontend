import React, { Fragment, useState, useEffect, useCallback } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../utils/global/index";

const AddProduct = (props) => {
  const [FormImage, setFormImage] = useState({
    file: null,
  });

  const onChangeImage = (e) => {
    setFormImage({ file: e.target.files[0] });
  };

  console.log(FormImage);

  const handlerChange = (event, param) => {
    setCreateProduct({
      ...FormProduct,
      [param]: event.target.value,
    });
  };
  const [FormProduct, setCreateProduct] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
    stock: "",
    category_id: "",
    // thumbnail_url: FormImage,
  });
  console.log(FormProduct);

  const handlerSubmit = async (event) => {
    // console.log(FormProduct);
    event.preventDefault();
    const newFormProduct = new FormData();
    newFormProduct.append("title", FormProduct.title);
    newFormProduct.append("description", FormProduct.description);
    newFormProduct.append("price", FormProduct.price);
    newFormProduct.append("author", FormProduct.author);
    newFormProduct.append("stock", FormProduct.stock);
    newFormProduct.append("category_id", FormProduct.category_id);
    newFormProduct.append("fileThumbnail", FormImage.file);
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post(`${ENDPOINT}/product/create`, newFormProduct, config)
      .then(() => {
        props.history.push("/admin/setProduct");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    getcategory();
  }, []);

  return (
    <Fragment>
      <h2>Add New Book</h2>
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
          <Form.Label className="col-sm-2 col-form-label">Category</Form.Label>
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
                // console.log(optionCategory);
                return (
                  <option key={key + 1} value={val.id}>
                    {val.category_name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <form enctype="multipart/form-data">
          <input type="file" name="myImage" onChange={onChangeImage} />
          {/* <button type="submit">Upload</button> */}
        </form>

        <LinkContainer to={`/admin/setProduct`} style={{ cursor: "pointer" }}>
          <Button variant="primary" type="submit" onClick={handlerSubmit}>
            Save
          </Button>
        </LinkContainer>
      </Form>
    </Fragment>
  );
};

export default AddProduct;
