import type { User } from "../types";
const emptyUser: User = {
  username: "",
  firstname: "",
  lastname: "",
  uid: 0,
  role: "viewer",
  last_login: new Date(),
};

const GroupMap = {
  0: "Gruppe A",
  1: "Gruppe B",
  2: "Gruppe C",
  3: "Gruppe D",
} as const;

export { emptyUser, GroupMap };
