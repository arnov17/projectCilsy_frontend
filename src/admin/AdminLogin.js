import React, { useState } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";

const LogInAdmin = (props) => {
  let db = {
    email: "arnov.julian17@gmail.com",
    userName: "arnov",
    password: "1234",
  };

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (event, param) => {
    setFormData({
      ...FormData,
      [param]: event.target.value,
    });
    console.log(FormData);
  };

  const history = useHistory("");
  const checkInput = () => {
    if (FormData.email.length === 0 || FormData.password.length === 0) {
      alert("Email dan Password still Empty");
    } else {
      history.push("admin/setProduct");
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <h2>Log in Admin</h2>
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Your Email"
            value={FormData.email}
            onChange={(event) => handleSignUpChange(event, "email")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Your Password"
            value={FormData.password}
            onChange={(event) => handleSignUpChange(event, "password")}
          />
        </div>
        Don't have an account? please, <Link to="/admin/register">Sign up</Link>
        <br />
        <button type="submit" className="btn btn-primary" onClick={checkInput}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default withRouter(LogInAdmin);
