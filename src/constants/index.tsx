import type { User, TableRow, TischState } from "../types";
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

const emptyTable: Array<TableRow> = [];

const emptyTische: Array<TischState> = [
  { tisch_nr: 1, status: "free", match_id: -1 },
  { tisch_nr: 2, status: "free", match_id: -1 },
  { tisch_nr: 3, status: "free", match_id: -1 },
  { tisch_nr: 4, status: "free", match_id: -1 },
  { tisch_nr: 5, status: "free", match_id: -1 },
  { tisch_nr: 6, status: "free", match_id: -1 },
  { tisch_nr: 7, status: "free", match_id: -1 },
  { tisch_nr: 8, status: "free", match_id: -1 },
  { tisch_nr: 9, status: "free", match_id: -1 },
  { tisch_nr: 10, status: "free", match_id: -1 },
  { tisch_nr: 11, status: "free", match_id: -1 },
  { tisch_nr: 12, status: "free", match_id: -1 },
  { tisch_nr: 13, status: "free", match_id: -1 },
  { tisch_nr: 14, status: "free", match_id: -1 },
  { tisch_nr: 15, status: "free", match_id: -1 },
  { tisch_nr: 16, status: "free", match_id: -1 },
  { tisch_nr: 17, status: "free", match_id: -1 },
  { tisch_nr: 18, status: "free", match_id: -1 },
];
export { emptyUser, GroupMap, emptyTable, emptyTische };
