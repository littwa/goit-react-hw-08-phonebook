import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "../../redux/auth/authSelectors";

const PublicRoute = ({ component: Component, isAuth, ...routeProps }) => (
 <Route
  {...routeProps}
  render={props => (isAuth && routeProps.restricted ? <Redirect to="/contacts" /> : <Component {...props} />)}
 />
);

const mapStateToProps = state => ({ isAuth: authSelectors.isAuth(state) });

export default connect(mapStateToProps)(PublicRoute);
