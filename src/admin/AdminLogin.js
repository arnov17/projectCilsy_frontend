import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../redux/action";
import axios from "axios";
import { ENDPOINT } from "../utils/global/index";

const Signin = (props) => {
  const { signin, signinResponse } = props;
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory("");

  useEffect(() => {
    if (signinResponse) {
      history.push("homepage");
    }
  }, [signinResponse]);

  const handleSignUpChange = (event, param) => {
    setFormData({
      ...FormData,
      [param]: event.target.value,
    });
  };

  const checkInput = () => {
    if (FormData.email.length === 0 || FormData.password.length === 0) {
      alert("Email and Password still Empty");
    } else {
      axios
        .post(`${ENDPOINT}/auth/login/admin`, FormData)
        .then((response) => {
          console.log(response);
          const getDataUser = response.data.data;
          localStorage.setItem("saveUserdata", JSON.stringify(getDataUser));
          const getToken = response.data.data.access_token;
          localStorage.setItem("userToken", JSON.stringify(getToken));
          history.push("/admin/dashboard");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Email and Password Wrong");
          history.push("/admin");
        });
    }
  };

  return (
    <div>
      <div id="headline">
        <h2>Admin Page Login</h2>
      </div>

      <div id="form">
        <Form id="form-login" className="m-4">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Email"
              value={FormData.email}
              onChange={(event) => handleSignUpChange(event, "email")}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              value={FormData.password}
              onChange={(event) => handleSignUpChange(event, "password")}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              // signin({ email: FormData.email, password: FormData.password });
              checkInput();
            }}
          >
            Sign in
          </Button>
          <br />
          Don't have an account? please,{" "}
          <Link to="/admin/register">Sign up Admin</Link>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signinResponse: state.bookReducer.signinResponse,
    users: state.bookReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (data) => dispatch(signin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
