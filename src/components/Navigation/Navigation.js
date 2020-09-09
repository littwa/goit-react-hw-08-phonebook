import React from "react";

import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import Nav from "react-bootstrap/Nav";

const Navigation = ({ isAuth }) => (
 <Nav variant="tabs">
  {!isAuth && (
   <Nav.Item>
    <Nav.Link href="/register"> Register </Nav.Link>
   </Nav.Item>
  )}
  {!isAuth && (
   <Nav.Item>
    <Nav.Link href="/login"> Log in </Nav.Link>
   </Nav.Item>
  )}
  {isAuth && (
   <Nav.Item>
    <Nav.Link href="/contacts"> Contacts </Nav.Link>
   </Nav.Item>
  )}
 </Nav>
);

export default connect(state => ({ isAuth: authSelectors.isAuth(state) }))(Navigation);
