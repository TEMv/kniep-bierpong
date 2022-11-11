type User = {
  username: string;
  uid: number;
  sessionTk?: string;
  profilePicturePath?: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "viewer";
};
type Test = {
  abc: string;
};
type ImageIndex = {
  [key: string]: string;
};
export { User, Test, ImageIndex };
