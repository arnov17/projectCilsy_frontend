import React, { Fragment, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/global/index";

const AddCategory = (props) => {
  const [FormCategory, setCreatecategory] = useState({
    category_name: "",
  });

  const handlerChange = (event, param) => {
    setCreatecategory({
      ...FormCategory,
      [param]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    console.log(FormCategory);
    event.preventDefault();
    await axios.post(`${ENDPOINT}/category/create`, FormCategory, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    props.history.push("/admin/setCategoryPage");
  };

  return (
    <Fragment>
      <h2>Add New Category</h2>
      <Form method="post">
        <Form.Group>
          <Form.Label className="col-sm-2 col-form-label">Category</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Entry Category"
            value={FormCategory.category_name}
            onChange={(event) => handlerChange(event, "category_name")}
          />
        </Form.Group>
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

export default AddCategory;
