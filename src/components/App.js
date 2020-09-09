import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Register from "../views/RegisterViews";
import Login from "../views/LoginViews";
import Contacts from "../views/Contacts";
import { connect } from "react-redux";
import authOperation from "../redux/auth/authOperation";
import appOperation from "../redux/app/appOperation";
import PrivateRoute from "../components/Routes/PrivateRoute";
import PublicRoute from "../components/Routes/PublicRoute";
import authSelectors from "../redux/auth/authSelectors";

class App extends React.Component {
 componentDidMount() {
  async function fn(thisProps) {
   await thisProps.getUser();
   thisProps.isAuth && thisProps.getContacts();
  }
  fn(this.props);
 }

 render() {
  return (
   <BrowserRouter>
    <Layout>
     <Switch>
      <PrivateRoute path="/contacts" restricted={false} component={Contacts} />
      <PublicRoute path="/register" exact restricted={true} component={Register} />
      <PublicRoute path="/login" exact restricted={true} component={Login} />
      <Redirect to="/contacts" />
     </Switch>
    </Layout>
   </BrowserRouter>
  );
 }
}

export default connect(
 state => ({
  isAuth: authSelectors.isAuth(state)
 }),
 {
  getUser: authOperation.getCurrentUser,
  getContacts: appOperation.getContacts
 }
)(App);
