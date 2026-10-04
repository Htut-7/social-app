const ROUTES = {
  REGISTER: "/Register",
  LOGIN: "/Login",
  HOME: "/home",
  PROFILE: (userId: string) => `/profile/${userId}`,
};

export default ROUTES;
