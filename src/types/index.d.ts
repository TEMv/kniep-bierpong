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
  Images: { [key: string]: string };
};
type LoginValues = {
  username: InputState;
  password: InputState;
};
type InputState = {
  status: "warning" | "valid";
  value: string;
};
type BPIDs = {
  team: number;
  p1: number;
  p2: number;
};
type BPTeamValues = {
  teamname: InputState;
  p1: InputState;
  p2: InputState;
  ids: BPIDs;
};
type ContentMap = {
  [key: number]: JSX.Element;
};
type BPPlayer = {
  playerid: number;
  name: string;
  teamid: number;
};
type BPTeamResponse = {
  group: number;
  players: { p1: BPPlayer; p2: BPPlayer };
  teamid: number;
  teamname: string;
};
type ModalContentType =
  | "edit-teams"
  | "add-missing-teams"
  | "enter-results"
  | "edit-results";

type BPMatch = {
  match_id: number;
  bp_id: number;
  team1_id: number;
  team2_id: number;
  cup_diff?: number;
  winner_id?: number;
  end_ts?: string;
  group: number;
  table_id: number;
};

type GroupBreakpoints = {
  [key: number]: Array<Array<number>>;
};

type TableRow = {
  teamid: number;
  teamname: string;
  wins: number;
  losses: number;
  cup_diff: number;
  out_in_ko: boolean;
};
type ValidOpponents = {
  [key: number]: Array<number>;
};
type NextGameMap = {
  [key: number]: number;
};
type BPTables = {
  tableA: Array<TableRow>;
  tableB: Array<TableRow>;
  tableC: Array<TableRow>;
  tableD: Array<TableRow>;
};
type TischState = {
  status: "free" | "reserved";
  tisch_nr: number;
  match_id: number;
};
type MatchResult = {
  match_id: number;
  winner_id: number;
  cup_diff: number;
};
type GroupMapType = {
  [key: number]: string;
};
export {
  User,
  EventProps,
  ImageIndex,
  LoginValues,
  ContentMap,
  ModalContentType,
  BPTeamValues,
  BPTeamResponse,
  BPMatch,
  BPTables,
  TableRow,
  TischState,
  MatchResult,
  GroupBreakpoints,
  ValidOpponents,
  NextGameMap,
  GroupMapType,
};
