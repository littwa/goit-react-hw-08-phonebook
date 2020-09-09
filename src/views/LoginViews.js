import React from "react";
import { connect } from "react-redux";
import authOperation from "../redux/auth/authOperation";
import { NavLink } from "react-router-dom";
import st from "./FormStyle.module.css";

class LoginViews extends React.Component {
 state = { email: "", password: "" };

 handleChange = e => {
  let { name, value } = e.target;
  this.setState({ [name]: value });
 };

 handleSubmit = e => {
  e.preventDefault();

  this.props.onLogin({ ...this.state });

  this.setState({ email: "", password: "" });
 };

 render() {
  return (
   <div className={st.wrap}>
    <h3>Login form</h3>
    <form className={st.TaskEditor} onSubmit={this.handleSubmit}>
     <label className={st.TaskEditorLabel}>
      Email
      <input
       className={st.TaskEditorInput}
       type="email"
       name="email"
       value={this.state.email}
       onChange={this.handleChange}
       autoComplete="off"
      />
     </label>
     <label className={st.TaskEditorLabel}>
      Password
      <input
       className={st.TaskEditorInput}
       type="password"
       name="password"
       value={this.state.password}
       onChange={this.handleChange}
       autoComplete="off"
      />
     </label>
     <button className={st.TaskEditorButton} type="submit">
      Login!
     </button>
    </form>
    <NavLink to="/register">Or register now</NavLink>
   </div>
  );
 }
}

const mapDispatchToProps = { onLogin: authOperation.login };

export default connect(null, mapDispatchToProps)(LoginViews);
