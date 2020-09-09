import React from "react";
import Operation from "../redux/auth/authOperation";
import { connect } from "react-redux";

import st from "./FormStyle.module.css";

class RegisterViews extends React.Component {
 state = { name: "", email: "", password: "" };

 handleChange = e => {
  let { name, value } = e.target;
  this.setState({ [name]: value });
 };

 handleSubmit = e => {
  e.preventDefault();

  this.props.onRegister({ ...this.state });

  this.setState({ name: "", email: "", password: "" });
 };

 render() {
  return (
   <div className={st.wrap}>
    <h3>Register form</h3>
    <form className={st.TaskEditor} onSubmit={this.handleSubmit}>
     <label className={st.TaskEditorLabel}>
      Name
      <input
       className={st.TaskEditorInput}
       type="name"
       name="name"
       value={this.state.name}
       onChange={this.handleChange}
       autoComplete="off"
      />
     </label>
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
      Register!
     </button>
    </form>
   </div>
  );
 }
}

const mapDispatchToProps = {
 onRegister: Operation.register
};

export default connect(null, mapDispatchToProps)(RegisterViews);
