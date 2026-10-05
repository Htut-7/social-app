const ROUTES = {
  REGISTER: "/Register",
  LOGIN: "/Login",
  HOME: "/home",
  PROFILE: (userId: string) => `/profile/${userId}`,
  EDIT_PROFILE: "/profile/edit",
};

export default ROUTES;
