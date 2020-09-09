import appAction from "./appAction";
import axios from "axios";

// axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com/";

const addContact = (name, number) => (dispatch, getSt) => {
 dispatch(appAction.addContactRequest());

 axios
  .post("/contacts", { name, number })
  .then(respons => dispatch(appAction.addContactSuccess(respons.data)))
  .catch(error => dispatch(appAction.addContactError(error)));
};

const getContacts = () => dispatch => {
 dispatch(appAction.getContactsRequest());

 axios
  .get("/contacts")
  .then(respons => dispatch(appAction.getContactsSuccess(respons.data)))
  .catch(error => dispatch(appAction.getContactsError(error)));
};

const delContact = id => dispatch => {
 dispatch(appAction.delContactRequest());

 axios
  .delete("/contacts/" + id)
  .then(dispatch(appAction.delContactSuccess(id)))
  .catch(error => dispatch(appAction.delContactError(error)));
};

export default { addContact, getContacts, delContact };
