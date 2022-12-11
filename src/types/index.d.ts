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
type EventProps = {
  name: string;
  start: string;
  end?: string;
  eventid: number;
  description?: string;
  type: string;
  location?: string;
};
type ImageIndex = {
  Logos: { [key: string]: string };
  LandingPage: { [key: string]: string };
  Videos: { [key: string]: string };
  Icons: { [key: string]: any };
};
type LoginValues = {
  username: InputState;
  password: InputState;
};
type InputState = {
  status: "warning" | "valid";
  value: string;
};
type ContentMap = {
  [key: number]: JSX.Element;
};
type ModalContentType = "edit-teams" | "add-missing-teams";
export {
  User,
  EventProps,
  ImageIndex,
  LoginValues,
  ContentMap,
  ModalContentType,
};
