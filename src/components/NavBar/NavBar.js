import React from "react";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import style from "./NavBar.module.css";
import { connect } from "react-redux";

const NavBar = ({ loadAuth }) => (
 <header className={style.nav}>
  <Navigation />
  {loadAuth ? <span>Loading...</span> : <UserMenu />}
 </header>
);

const mapStateToProps = state => ({
 loadAuth: state.auth.loadingAuth
});

export default connect(mapStateToProps)(NavBar);
