import React from "react";
import { connect } from "react-redux";
import "./../views/home/Homepage";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../components/footer/Footer";

const Dashboard = (props) => {
  // const { signedUser } = props;
  // console.log(storageData);

  if (!localStorage.getItem("saveUserdata")) {
    return <>Loading</>;
  }

  return (
    <div>
      <section id="about-us">
        <div>
          <p className="about-us2">
            Hai, Admin {JSON.parse(localStorage.getItem("saveUserdata")).name}{" "}
          </p>
          <p className="about-us3">Welcome to Dashboard Cilsy Bookstore </p>
          <LinkContainer to="/admin/setProduct" style={{ cursor: "pointer" }}>
            {/* <h2>&larr;</h2> */}
            <button>Page setProduct</button>
          </LinkContainer>
        </div>
      </section>
      <section id="home">
        <img src="https://newenglandtraveljournal.com/wp-content/uploads/2019/12/An-Unlikley-Story3-800x445.jpg" />
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signedUser: state.bookReducer.signedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
