const getters = {
  token: state => state.user.token,
  addRoutes: state => state.user.addRoutes,
  permission_routes: state => state.user.routes
};
export default getters;
