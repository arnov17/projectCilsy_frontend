import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../../redux/action";
import "./Login.css";

const Signin = (props) => {
  const { signin, signinResponse, users } = props;
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
    //   let findUser = users.find(
    //     (user) =>
    //       user.username === FormData.username &&
    //       user.password === FormData.password
    //   );
    if (FormData.email.length === 0 || FormData.password.length === 0) {
      alert("Email dan Password still Empty");
    } else {
      history.push("homepage");
    }
    //   } else if (findUser) {
    //     history.push("homepage");
    //   } else {
    //     alert("email or password is Wrong");
    //   }
  };

  return (
    <div>
      <div id="headline">
        <h2>Welcome to Cilsy Bookstore</h2>
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
              signin({ email: FormData.email, password: FormData.password });
              checkInput();
            }}
          >
            Sign in
          </Button>
          <br />
          Don't have an account? please, <Link to="/signup">Sign up</Link>
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
