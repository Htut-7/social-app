const ROUTES = {
  REGISTER: "/Register",
  LOGIN: "/Login",
  HOME: "/home",
  PROFILE: (userId: string) => `/profile/${userId}`,
  EDIT_PROFILE: "/profile/edit",
  CREATE: "/post/create",
  EDIT_POST: (postId: string) => `/post/edit/${postId}`,
};

export default ROUTES;
