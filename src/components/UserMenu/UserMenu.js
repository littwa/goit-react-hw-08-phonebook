import React from "react";
import { connect } from "react-redux";
import authOperation from "../../redux/auth/authOperation";
import authSelectors from "../../redux/auth/authSelectors";
// import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import style from "./UserMenu.module.css";

const UserMenu = ({ userEmail, onLogout, isAuth }) => {
 return (
  <div className={style.wrap}>
   {isAuth && (
    <>
     <span>
      User:
      <span className={style.email}> {userEmail} </span>
     </span>
     <Button variant="dark" type="button" onClick={onLogout}>
      Log out
     </Button>
    </>
   )}
  </div>
 );
};

const mapStateToProps = state => ({
 userEmail: authSelectors.userEmail(state),
 isAuth: authSelectors.isAuth(state)
});
const mapDispatchToProps = { onLogout: authOperation.logout };
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
