import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import Filter from "../components/Filter/Filter";
import IsAlreadyTrue from "../components/IsAlreadyTrue";
import animation from "./Appanimation.module.css";
import animationIsAlready from "../components/IsAlreadyTrue/isAlreadyTrueAnimation.module.css";
import FilterAnimation from "../components/Filter/FilterAnimation.module.css";
import { connect } from "react-redux";
import appOperation from "../redux/app/appOperation";
import authSelectors from "../redux/auth/authSelectors";
import appSelectors from "../redux/app/appSelectors";

class Contacts extends Component {
 state = {
  isAlready: false,
  isToken: null
 };

 static getDerivedStateFromProps(nextProps, prevState) {
  if (prevState.isToken !== nextProps.isAuth && nextProps.name) {
   nextProps.getContacts();
  }
  return prevState.isToken !== nextProps.isAuth && { isToken: nextProps.isAuth };
 }

 changeIsAlready = name => {
  if (appSelectors.getContactIsAlready(this.props.state, name)) {
   this.setState({ isAlready: true });
   return false;
  } else {
   this.setState({ isAlready: false });
  }
  return true;
 };

 render() {
  const { contacts, loading, contactsArrayFiltered } = this.props;

  return (
   <>
    <CSSTransition
     in={this.state.isAlready === true}
     timeout={300}
     classNames={animationIsAlready}
     unmountOnExit
    >
     <IsAlreadyTrue onChangeIsAlready={this.changeIsAlready} />
    </CSSTransition>

    <div className={animation.container}>
     <CSSTransition in={true} appear={true} timeout={1000} classNames={animation} unmountOnExit>
      {stage => {
       return (
        <>
         <h1 className={animation.title}>Phonebook</h1>
         <CSSTransition in={stage === "entered"} timeout={300} classNames={animation} unmountOnExit>
          <p className={animation.p}> &#9742;</p>
         </CSSTransition>
        </>
       );
      }}
     </CSSTransition>

     <ContactForm changeIsAlready={this.changeIsAlready} />

     <CSSTransition in={contacts.length > 1} timeout={300} classNames={FilterAnimation} unmountOnExit>
      <Filter />
     </CSSTransition>
     {loading && <h1>Loading...</h1>}
     <ContactList contacts={contactsArrayFiltered} />
    </div>
   </>
  );
 }
}

const mapStateToProps = state => ({
 name: authSelectors.userName(state),
 isAuth: authSelectors.isAuth(state),
 filter: appSelectors.getFilter(state),
 contacts: appSelectors.getContactsSelector(state),
 loading: appSelectors.getLoading(state),
 contactsArrayFiltered: appSelectors.contactsArrayFilteredSel(state),
 state
});

let mapDispatchToProps = { getContacts: appOperation.getContacts };

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
