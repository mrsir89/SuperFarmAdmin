const isAuthenticated = (auth) => {
  const { token, userDetails } = auth;
  return token !== undefined && token !== null && userDetails !== undefined && userDetails !== null;
}

export default isAuthenticated;