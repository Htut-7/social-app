const ROUTES = {
  REGISTER: "/Register",
  LOGIN: "/Login",
  HOME: "/home",
  PROFILE: (userId: string) => `/profile/${userId}`,
  EDIT_PROFILE: "/profile/edit",
  CREATE: "/post/create",
  EDIT_POST: (postId: string) => `/post/edit/${postId}`,
  POST: (postId: string) => `/post/${postId}`,
};

export default ROUTES;
