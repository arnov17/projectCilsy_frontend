import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { withRouter, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../../redux/action";
import './Login.css'

const Signin = (props) => {
  const { signin, signinResponse, users} = props;
  const [FormData, setFormData] = useState({
    username: '',
    password: '',
  })
  const history = useHistory("");

  useEffect(() => {
    if (signinResponse) {
      history.push("homepage");
    }
  }, [signinResponse]);

  const handleSignUpChange = (event, param) => {
    setFormData({
        ...FormData,
        [param] : event.target.value
    })
}

  const checkInput = () => {
    let findUser = users.find((user) => 
      user.username === FormData.username && user.password === FormData.password
    )
    if(FormData.username.length === 0 || FormData.password.length === 0) {
      alert('Email dan Password still Empty')
    } else if(findUser) {
      history.push("homepage")
  } else {
      alert('email or password is Wrong')
  }
}

  return (
    <div id="form">
        <Form id="form-login"className="m-4">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Username"
              value={FormData.username} 
              onChange={(event) => handleSignUpChange(event, 'username')}
            />
          </Form.Group>
    
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              value={FormData.password} 
              onChange={(event) => handleSignUpChange(event, 'password')}
            />
          </Form.Group>
    
          <Button
            variant="primary"
            onClick={() => {signin({ username: FormData.username, password: FormData.password }); checkInput()} }
          >
            Sign in
          </Button>
          <br />
          Don't have an account? please, <Link to="/signup">Sign up</Link>
        </Form>
    </div>
    );
};

const mapStateToProps = (state) => {
  return {
    signinResponse: state.bookReducer.signinResponse,
    users : state.bookReducer.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (data) => dispatch(signin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
