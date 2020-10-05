import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../redux/action";
import "./Footer.css";

const Footer = (props) => {
  // const { signout } = props;
  const logOut = () => {
    localStorage.removeItem("saveUserdata");
    localStorage.removeItem("userToken");
    localStorage.removeItem("saveidTransaction");
  };
  return (
    <div>
      <footer id="footer" className="container-fluid bg-4 text-center">
        <p>Create by https://github.com/arnov17</p>
        <p>
          <Link to="/" onClick={() => logOut()}>
            Sign Out
          </Link>
        </p>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signedUser: state.bookReducer.signedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
