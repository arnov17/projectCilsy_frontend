import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

import { ENDPOINT, access_token } from "../utils/global/index";

const ResgiterAdmin = () => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValiadation, setValidation] = useState(false);

  const handleChangeFormRegister = (event, param) => {
    setFormRegister({
      ...formRegister,
      [param]: event.target.value,
    });
    // console.log(formRegister);
    CheckValidation();
  };

  const CheckValidation = () => {
    if (
      formRegister.name.length > 0 &&
      formRegister.email.length > 0 &&
      formRegister.password.length >= 5
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const handleSignUpadmin = () => {
    axios.post(`${ENDPOINT}/auth/register/admin`, formRegister, {});
  };

  return (
    <div>
      <div id="headline">
        <h2>Admin Form Register</h2>
      </div>

      <div id="form">
        <Form id="form-reg" className="m-4">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formRegister.name}
              onChange={(event) => handleChangeFormRegister(event, "name")}
            />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formRegister.username}
              onChange={(event) => handleChangeFormRegister(event, "email")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formRegister.password}
              onChange={(event) => handleChangeFormRegister(event, "password")}
            />
          </Form.Group>
          <Link to="/admin">
            <Button
              variant="primary"
              disabled={isValiadation ? false : true}
              onClick={() => handleSignUpadmin()}
            >
              Submit
            </Button>
          </Link>
          <br />
          Already have an account? <Link to="/admin">Sign in Admin</Link>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(ResgiterAdmin);
