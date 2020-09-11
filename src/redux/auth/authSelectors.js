const isAuth = (state) => state.auth.token;
const userName = (state) => state.auth.user.name;
const userEmail = (state) => state.auth.user.email;
const errorAuth = (state) => state.auth.error;

export default { isAuth, userName, userEmail, errorAuth };
