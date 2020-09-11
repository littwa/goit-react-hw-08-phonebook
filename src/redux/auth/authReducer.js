import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./authActions";

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (state, action) => action.payload.user,
  [authActions.loginSuccess]: (state, action) => action.payload.user,
  [authActions.getCurrentUserSuccess]: (state, action) => action.payload,
  [authActions.logoutSuccess]: () => initialUserState,
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (state, action) => action.payload.token,
  [authActions.loginSuccess]: (state, action) => action.payload.token,
  [authActions.logoutSuccess]: () => null,
});

const error = createReducer(null, {
  [authActions.registerError]: (state, action) => action.payload,
  [authActions.loginError]: (state, action) => action.payload,
  [authActions.logoutError]: (state, action) => action.payload,
  [authActions.getCurrentUserError]: (state, action) => action.payload,
  [authActions.registerSuccess]: (state, action) => null,
  [authActions.loginSuccess]: (state, action) => null,
});

const loadingAuth = createReducer(false, {
  [authActions.getCurrentUserRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.registerRequest]: () => true,
  [authActions.registerSuccess]: () => false,
  [authActions.registerError]: () => false,
  [authActions.loginRequest]: () => true,
  [authActions.loginSuccess]: () => false,
  [authActions.loginError]: () => false,
  [authActions.logoutRequest]: () => true,
  [authActions.logoutSuccess]: () => false,
  [authActions.logoutError]: () => false,
});

export default combineReducers({
  user,
  token,
  error,
  loadingAuth,
});
