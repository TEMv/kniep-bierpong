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
  Logos: { [key: string]: string };
  LandingPage: { [key: string]: string };
  Videos: { [key: string]: string };
};

export { User, Test, ImageIndex };
