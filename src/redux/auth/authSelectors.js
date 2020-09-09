const isAuth = state => state.auth.token;
const userName = state => state.auth.user.name;
const userEmail = state => state.auth.user.email;

export default { isAuth, userName, userEmail };
