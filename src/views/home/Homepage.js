import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Homepage.css";
import Footer from "../../components/footer/Footer";

const Homepage = (props) => {
  // const { signedUser } = props;
  // console.log(storageData);
  // useEffect(() => {
  //   window.location.reload();
  // });

  if (!localStorage.getItem("saveUserdata")) {
    return <>Loading</>;
  }

  return (
    <div>
      <section id="about-us">
        <div>
          <p className="about-us2">
            Hai, {JSON.parse(localStorage.getItem("saveUserdata")).name} ... How
            Are You ?{" "}
          </p>
          <p className="about-us3">Welcome to Cilsy Bookstore</p>
          <p className="about-us4">
            Cilsy Book Online Store adalah Toko Buku online dengan koleksi buku
            terbanyak di Indonesia. Anak perusahaan dari Cilsy One ini telah
            menyediakan jaringan toko buku Online. Didirikan pada tanggal 19
            Maret 1992. Toko buku ini berawal dari toko buku kecil berukuran 25
            meter persegi di daerah Jakarta Barat.{" "}
          </p>
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

export default connect(mapStateToProps)(Homepage);
