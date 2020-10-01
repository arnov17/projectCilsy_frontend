import React, { Fragment, useEffect, useState } from "react";

import { Form, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/global/index";

const UpdateCategory = (props) => {
  console.log(props);

  const [FormCategory, setCategory] = useState({
    category_name: "",
  });

  // useEffect(() => {
  //   props.getBookById(id);
  // }, []);

  useEffect(async () => {
    // props.getBookById(id);
    const id = props.match.params.id;
    const response = await axios.get(`${ENDPOINT}/category/read/${id}`);
    setCategory({
      ...FormCategory,
      category_name: response.data.category_name,
    });
  }, []);

  const handlerChange = (event, param) => {
    setCategory({
      ...FormCategory,
      [param]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    // console.log(FormProduct)
    event.preventDefault();
    const id = props.match.params.id;
    console.log(id);
    await axios.patch(`${ENDPOINT}/category/update`, FormCategory, {
      data: { id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    props.history.push("/admin/setCategoryPage");
  };
  console.log(FormCategory);
  return (
    <Fragment>
      <Form method="post">
        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">
            Category name
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Entry Book Title"
            value={FormCategory.category_name}
            onChange={(event) => handlerChange(event, "category_name")}
          />
        </Form.Group>
        <LinkContainer
          to={`/admin/setCategoryPage`}
          style={{ cursor: "pointer" }}
        >
          <Button variant="primary" type="submit" onClick={handlerSubmit}>
            Save
          </Button>
        </LinkContainer>
      </Form>
    </Fragment>
  );
};

export default UpdateCategory;
