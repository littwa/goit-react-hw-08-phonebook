import axios from "axios";
import authActions from "./authActions";



axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com/";

const token = {
 set(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
 },
 unset() {
  axios.defaults.headers.common.Authorization = "";
 }
};

const register = credentials => dispatch => {
 dispatch(authActions.registerRequest());
 axios
  .post("/users/signup", credentials)
  .then(response => {
   token.set(response.data.token);
   dispatch(authActions.registerSuccess(response.data));
  })
  .catch(error => dispatch(authActions.registerError(error)));
};

const login = credentials => dispatch => {
 dispatch(authActions.loginRequest());

 axios
  .post("/users/login", credentials)
  .then(response => {
   token.set(response.data.token);
   dispatch(authActions.loginSuccess(response.data));
  })
  .catch(error => dispatch(authActions.loginError(error)));
};

const logout = () => dispatch => {
 axios
  .post("/users/logout")
  .then(() => {
   token.unset();
   dispatch(authActions.logoutSuccess());
  })
  .catch(error => dispatch(authActions.logoutError(error)));
};

const getCurrentUser = () => (dispatch, getState) => {
 dispatch(authActions.getCurrentUserRequest());

 const currentToken = getState().auth.token;
 token.set(currentToken);
 if (!currentToken) {
  dispatch(
   authActions.getCurrentUserError("no token - no error :))(for change state.auth.loadingAuth on false)")
  );
  return false;
 }

 axios
  .get("/users/current")
  .then(response => {
   dispatch(authActions.getCurrentUserSuccess(response.data));
  })
  .catch(error => dispatch(authActions.getCurrentUserError(error)));
};

export default { register, login, logout, getCurrentUser };
