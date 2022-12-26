import type { User, TableRow, TischState, GroupBreakpoints } from "../types";
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

const recalcBreakpoints = {
  0: 8,
  1: 16,
  2: 24,
  3: 30,
};

const groupBreakpoints: GroupBreakpoints = {
  8: [
    [0, 8],
    [8, 16],
  ],
  16: [
    [0, 4],
    [4, 12],
    [12, 16],
  ],
  24: [
    [2, 8],
    [8, 14],
  ],
  30: [[5, 11]],
};

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

const initialKoMatchups = {
  0: { team1: { group: 0, pos: 0 }, team2: { group: 1, pos: 7 } },
  1: { team1: { group: 2, pos: 3 }, team2: { group: 3, pos: 4 } },
  2: { team1: { group: 0, pos: 2 }, team2: { group: 1, pos: 5 } },
  3: { team1: { group: 3, pos: 1 }, team2: { group: 2, pos: 6 } },
  4: { team1: { group: 0, pos: 4 }, team2: { group: 1, pos: 3 } },
  5: { team1: { group: 2, pos: 0 }, team2: { group: 3, pos: 7 } },
  6: { team1: { group: 0, pos: 6 }, team2: { group: 1, pos: 1 } },
  7: { team1: { group: 2, pos: 2 }, team2: { group: 3, pos: 5 } },
  8: { team1: { group: 0, pos: 7 }, team2: { group: 1, pos: 0 } },
  9: { team1: { group: 2, pos: 4 }, team2: { group: 3, pos: 3 } },
  10: { team1: { group: 0, pos: 5 }, team2: { group: 1, pos: 2 } },
  11: { team1: { group: 3, pos: 6 }, team2: { group: 2, pos: 2 } },
  12: { team1: { group: 0, pos: 3 }, team2: { group: 1, pos: 4 } },
  13: { team1: { group: 3, pos: 0 }, team2: { group: 2, pos: 7 } },
  14: { team1: { group: 0, pos: 1 }, team2: { group: 1, pos: 6 } },
  15: { team1: { group: 3, pos: 2 }, team2: { group: 2, pos: 5 } },
};
export {
  emptyUser,
  GroupMap,
  emptyTable,
  emptyTische,
  recalcBreakpoints,
  groupBreakpoints,
};
