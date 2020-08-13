import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../redux/action";
import './Homepage.css'

const Homepage = (props) => {
  const { signedUser, signout } = props;

  return (
    <div>
      <section id="about-us">
        <div>
          <p className="about-us2">Hai, {signedUser[0].name} ... How Are You </p>
          <p className="about-us3">Welocme to Cilsy Bookstore</p>
          <p className="about-us4">Cilsy Book Online Store adalah Toko Buku online dengan koleksi buku terbanyak di Indonesia. Anak perusahaan dari Cilsy One ini telah menyediakan jaringan toko buku Online. Didirikan pada tanggal 19 Maret 1992. Toko buku ini berawal dari toko buku kecil berukuran 25 meter persegi di daerah Jakarta Barat. </p>
        </div>
      </section>
      <p>
        <Link to="/" onClick={() => signout()}>
          sign out
        </Link>
      </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
