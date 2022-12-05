import type { User } from "../types";
export const emptyUser: User = {
  username: "",
  firstname: "",
  lastname: "",
  uid: 0,
  role: "viewer",
  last_login: new Date(),
};
