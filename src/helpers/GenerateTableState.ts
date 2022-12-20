import { useState } from "react";
import { BPTeamResponse, BPMatch } from "../types";
function generateTableState(
  teams: Array<BPTeamResponse>,
  matches: Array<BPMatch>
) {
  const groupA = teams.filter((team) => team.group === 0);
  const groupB = teams.filter((team) => team.group === 1);
  const groupC = teams.filter((team) => team.group === 2);
  const groupD = teams.filter((team) => team.group === 3);
  const matchesA = matches.filter((match) => match.group === 0);
  const matchesB = matches.filter((match) => match.group === 1);
  const matchesC = matches.filter((match) => match.group === 2);
  const matchesD = matches.filter((match) => match.group === 3);
}
export default generateTableState;
