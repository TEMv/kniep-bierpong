import { BPTeamResponse, BPMatch, BPTables, TableRow } from "../types";
import { useState, useEffect } from "react";
import { emptyTable } from "../constants";
export function useTableState(
  teams: Array<BPTeamResponse>,
  matches: Array<BPMatch>,
  enabled: boolean
) {
  const [tables, setTables] = useState<BPTables>({
    tableA: emptyTable,
    tableB: emptyTable,
    tableC: emptyTable,
    tableD: emptyTable,
  });
  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (teams.length > 0 && matches.length > 0) {
      calcTables();
    }
  }, [matches, teams]);

  function calcTables() {
    const matchesA = matches.filter((match) => match.group === 0);
    const matchesB = matches.filter((match) => match.group === 1);
    const matchesC = matches.filter((match) => match.group === 2);
    const matchesD = matches.filter((match) => match.group === 3);

    let { tempGroupA, tempGroupB, tempGroupC, tempGroupD } = initTables();

    tempGroupA = evaluateGamesForGroup(matchesA, tempGroupA);
    tempGroupB = evaluateGamesForGroup(matchesB, tempGroupB);
    tempGroupC = evaluateGamesForGroup(matchesC, tempGroupC);
    tempGroupD = evaluateGamesForGroup(matchesD, tempGroupD);
    /*
    TODO: Test SPielergebnisse eintragen und gucken, ob games richtig evaluiert werden
    DANN: Tabellen nach Siegen und Becherdifferenzen Sortieren
    DANN: Alg zum Bestimmen der nächsten Spiele schreiben (Nach sortiertem Array und schauen, ob schon mal gegeneinander gespielt)

    */
  }

  function initTables() {
    const groupA = teams.filter((team) => team.group === 0);
    const groupB = teams.filter((team) => team.group === 1);
    const groupC = teams.filter((team) => team.group === 2);
    const groupD = teams.filter((team) => team.group === 3);

    let tempGroupA: Array<TableRow> = groupA.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
      };
    });
    let tempGroupB: Array<TableRow> = groupB.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
      };
    });
    let tempGroupC: Array<TableRow> = groupC.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
      };
    });
    let tempGroupD: Array<TableRow> = groupD.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
      };
    });
    return { tempGroupA, tempGroupB, tempGroupC, tempGroupD };
  }

  function evaluateGamesForGroup(
    matches: Array<BPMatch>,
    group: Array<TableRow>
  ) {
    for (let match in matches) {
      let winner_id = matches[match].winner_id;
      if (!winner_id) continue;
      let cup_diff = matches[match].cup_diff || 1;

      let loser_id =
        winner_id === matches[match].team1_id
          ? matches[match].team2_id
          : matches[match].team1_id;
      let winner_entry: TableRow = group.filter(
        (team) => team.teamid === winner_id
      )[0];
      winner_entry = {
        teamid: winner_entry.teamid,
        wins: winner_entry.wins + 1,
        teamname: winner_entry.teamname,
        losses: winner_entry.losses,
        cup_diff: winner_entry.cup_diff + cup_diff,
      };
      let loser_entry: TableRow = group.filter(
        (team) => team.teamid === loser_id
      )[0];
      loser_entry = {
        teamid: loser_entry.teamid,
        wins: loser_entry.wins,
        teamname: loser_entry.teamname,
        losses: loser_entry.losses + 1,
        cup_diff: loser_entry.cup_diff - cup_diff,
      };
      group = [...group, winner_entry, loser_entry];
    }
    return group;
  }
  return null;
}