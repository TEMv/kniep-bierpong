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
    //match matches to group
    const matchesA = matches.filter((match) => match.group === 0);
    const matchesB = matches.filter((match) => match.group === 1);
    const matchesC = matches.filter((match) => match.group === 2);
    const matchesD = matches.filter((match) => match.group === 3);
    const koMatches = matches.filter((match) => match.group >= 10);

    //init with right fields
    let { tempGroupA, tempGroupB, tempGroupC, tempGroupD } = initTables();

    //calc wins and losses
    tempGroupA = evaluateGamesForGroup(matchesA, tempGroupA);
    tempGroupB = evaluateGamesForGroup(matchesB, tempGroupB);
    tempGroupC = evaluateGamesForGroup(matchesC, tempGroupC);
    tempGroupD = evaluateGamesForGroup(matchesD, tempGroupD);

    //calc ko games
    tempGroupA = evaluateKoGames(koMatches, tempGroupA);
    tempGroupB = evaluateKoGames(koMatches, tempGroupB);
    tempGroupC = evaluateKoGames(koMatches, tempGroupC);
    tempGroupD = evaluateKoGames(koMatches, tempGroupD);

    //sort
    tempGroupA = sortTables(tempGroupA);
    tempGroupB = sortTables(tempGroupB);
    tempGroupC = sortTables(tempGroupC);
    tempGroupD = sortTables(tempGroupD);

    setTables({
      tableA: tempGroupA,
      tableB: tempGroupB,
      tableC: tempGroupC,
      tableD: tempGroupD,
    });

    /*
      NEUE TODOS: 
      Gruppenphasenspiele abfangen ( Gruppe 5 oder so), dann den Verlierer auf "out_in_ko" true setzen für farbige Tabelle
    */
  }

  function sortTables(group: Array<TableRow>) {
    return group.sort(
      (a, b) =>
        b.wins - b.losses - (a.wins - a.losses) || b.cup_diff - a.cup_diff
    );
  }

  function evaluateKoGames(koMatches: Array<BPMatch>, group: Array<TableRow>) {
    const tempGroup: Array<TableRow> = JSON.parse(JSON.stringify(group));
    const tempKoMatches: Array<BPMatch> = JSON.parse(JSON.stringify(koMatches));
    const finishedGames = tempKoMatches.filter((match) => match.winner_id);
    for (let game in finishedGames) {
      for (let row in tempGroup) {
        let teamid = tempGroup[row].teamid;
        if (
          teamid === finishedGames[game].team1_id &&
          teamid !== finishedGames[game].winner_id
        ) {
          tempGroup[row].out_in_ko = true;
        } else if (
          teamid === finishedGames[game].team2_id &&
          teamid !== finishedGames[game].winner_id
        ) {
          tempGroup[row].out_in_ko = true;
        }
      }
    }
    return tempGroup;
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
        out_in_ko: false,
      };
    });
    let tempGroupB: Array<TableRow> = groupB.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
        out_in_ko: false,
      };
    });
    let tempGroupC: Array<TableRow> = groupC.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
        out_in_ko: false,
      };
    });
    let tempGroupD: Array<TableRow> = groupD.map((team) => {
      return {
        teamid: team.teamid,
        teamname: team.teamname,
        wins: 0,
        losses: 0,
        cup_diff: 0,
        out_in_ko: false,
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
        teamname: winner_entry.teamname,
        wins: winner_entry.wins + 1,
        losses: winner_entry.losses,
        cup_diff: winner_entry.cup_diff + cup_diff,
        out_in_ko: false,
      };
      let loser_entry: TableRow = group.filter(
        (team) => team.teamid === loser_id
      )[0];
      loser_entry = {
        teamid: loser_entry.teamid,
        teamname: loser_entry.teamname,
        wins: loser_entry.wins,
        losses: loser_entry.losses + 1,
        cup_diff: loser_entry.cup_diff - cup_diff,
        out_in_ko: false,
      };
      for (let team in group) {
        if (group[team].teamid === winner_entry.teamid) {
          group[team] = winner_entry;
        } else if (group[team].teamid === loser_entry.teamid) {
          group[team] = loser_entry;
        }
      }
    }
    return group;
  }
  return tables;
}
