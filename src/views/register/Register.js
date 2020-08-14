import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../redux/action";
import './Register.css'

const Signup = (props) => {
  const { signup } = props;
   const [formRegister, setFormRegister] = useState({
        name : '',
        username : '',
        password : '',
        saldo : 0
    })
    const [isValiadation, setValidation] = useState(false)

    const handleChangeFormRegister = (event, param) => {
        setFormRegister({
            ...formRegister,
            [param] : event.target.value
        })
        console.log(formRegister)
        CheckValidation()
    }

   const CheckValidation = () => {
        if(formRegister.name.length > 0 && formRegister.username.length > 0 && formRegister.password.length >= 5) {
          setValidation(true)
        } else {
          setValidation(false)
        }
    }

  return (
    <div>
      <div id="headline">
        <h2>Form Register</h2>
      </div>

      <div id="form">
        <Form id="form-reg" className="m-4">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formRegister.name} onChange={(event) => handleChangeFormRegister(event, 'name')}
              />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={formRegister.username} onChange={(event) => handleChangeFormRegister(event, 'username')}
              />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formRegister.password} onChange={(event) => handleChangeFormRegister(event, 'password')}
            />
          </Form.Group>
          <Link to="/">
            <Button
                variant="primary"
                disabled={isValiadation ? false : true}
                onClick={() =>
                  signup({ name: formRegister.name, username: formRegister.username, password: formRegister.password, saldo: formRegister.saldo })
                }
            >
                Submit
            </Button>
          </Link>
          <br />
          Already have an account? <Link to="/">Sign in</Link>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.bookReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data) => dispatch(signup(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
