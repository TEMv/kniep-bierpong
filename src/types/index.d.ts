type User = {
  username: string;
  uid: number;
  profilePicturePath?: string;
  firstname: string;
  lastname: string;
  email?: string;
  last_login: Date;
  role: "admin" | "viewer";
};
type Test = {
  abc: string;
};
type ImageIndex = {
  Logos: { [key: string]: string };
  LandingPage: { [key: string]: string };
  Videos: { [key: string]: string };
};
type LoginValues = {
  username: InputState;
  password: InputState;
};
type InputState = {
  status: "warning" | "valid";
  value: string;
};
export { User, Test, ImageIndex, LoginValues };
