import { useState, useEffect } from "react";
import {
  BPMatch,
  BPTeamResponse,
  BPTables,
  TableRow,
  ValidOpponents,
} from "../types";
import {
  recalcBreakpoints,
  groupBreakpoints,
  initialKoMatchups,
  koMatches,
} from "../constants";
import { useAddMatches } from "./queries";
import { useQueryClient } from "@tanstack/react-query";
import { match } from "assert";
export function useNextGames(
  teams: Array<BPTeamResponse>,
  matches: Array<BPMatch>,
  tableState: BPTables,
  bpid: number,
  enabled: boolean
) {
  const queryClient = useQueryClient();
  const addMatches = useAddMatches(bpid, queryClient);
  const [koGamesBuilt, setKoGamesBuilt] = useState(false);
  useEffect(() => {
    if (!enabled) {
      return;
    }
    calcNextGames();
    for (let team in teams) {
      if (hasDuplicates(alreadyPlayed(teams[team]))) {
        console.log(alreadyPlayed(teams[team]));
      }
    }
  }, [tableState]);
  function hasDuplicates(array: Array<number>) {
    return new Set(array).size !== array.length;
  }
  function alreadyPlayed(team: BPTeamResponse) {
    let played = [];
    for (let match in matches) {
      if (matches[match].end_ts) {
        if (matches[match].team1_id === team.teamid) {
          played.push(matches[match].team2_id);
        } else if (matches[match].team2_id === team.teamid) {
          played.push(matches[match].team1_id);
        }
      }
    }
    return played;
  }

  function handleKoGames() {
    let koGames = matches.filter((match) => match.group >= 10);
    for (let match in koMatches) {
      let game1 = koGames.filter(
        (game) => game.group === koMatches[match].req[0]
      )[0];
      let game2 = koGames.filter(
        (game) => game.group === koMatches[match].req[1]
      )[0];

      if (
        game1?.winner_id &&
        game2?.winner_id &&
        !koGames.filter((game) => game.group === koMatches[match].id)[0]
      ) {
        let newmatch = {
          match_id: matches.length + 1,
          bp_id: 1,
          team1_id: game1?.winner_id,
          team2_id: game2?.winner_id,
          group: koMatches[match].id,
          table_id: koMatches[match].id - 25,
        };
        addMatches.mutate({ matches: [newmatch] });
      }
    }
  }

  function calcNextGames() {
    if (
      matches.filter((match) => match.end_ts).length === 132 &&
      matches.length === 132
    ) {
      buildKoGames();
    } else if (matches.length > 132) {
      handleKoGames();
    } else {
      matchupTeams(
        tableState.tableA,
        0,
        checkGroupForRebuild(0, tableState.tableA)
      );
      matchupTeams(
        tableState.tableB,
        1,
        checkGroupForRebuild(1, tableState.tableB)
      );
      matchupTeams(
        tableState.tableC,
        2,
        checkGroupForRebuild(2, tableState.tableC)
      );
      matchupTeams(
        tableState.tableD,
        3,
        checkGroupForRebuild(3, tableState.tableD)
      );
    }
  }
  /*
Denkansatz: alle matches durchgehen, für jede gruppe prüfen: noch ungespielte games vorhanden
Falls ja: nichts tun, falls nein: neuberechnen
Wenn neuberechnet, in DB schreiben direkt und matches neu fetchen
*/

  function buildKoGames() {
    if (koGamesBuilt) return;
    let komatches: Array<BPMatch> = [];
    const tableStateMap = [
      tableState.tableA,
      tableState.tableB,
      tableState.tableC,
      tableState.tableD,
    ];
    for (let matchup in initialKoMatchups) {
      komatches.push({
        match_id: matches.length + komatches.length + 1,
        bp_id: 1,
        team1_id:
          tableStateMap[initialKoMatchups[matchup].team1.group][
            initialKoMatchups[matchup].team1.pos
          ].teamid,
        team2_id:
          tableStateMap[initialKoMatchups[matchup].team2.group][
            initialKoMatchups[matchup].team2.pos
          ].teamid,
        group: 10 + komatches.length,
        table_id: komatches.length + 1,
      });
    }
    console.log(komatches);
    addMatches.mutate({ matches: komatches });
    setKoGamesBuilt(true);
  }

  function newMatchup(
    validOpponentsArr: Array<number>,
    matchups: Array<BPMatch>,
    i: number
  ) {
    let tempMatchups2 = JSON.parse(JSON.stringify(matchups));
    for (let j = validOpponentsArr.length - 1; j >= 0; j--) {
      console.log(validOpponentsArr[j]);
      for (let match in tempMatchups2) {
        if (tempMatchups2[match].team2_id === validOpponentsArr[j]) {
          if (
            !alreadyPlayed(
              teams.filter(
                (team) => team.teamid === tempMatchups2[match].team1_id
              )[0]
            ).includes(tempMatchups2[i].team2_id)
          ) {
            let temp = tempMatchups2[i].team2_id;
            tempMatchups2[i].team2_id = tempMatchups2[match].team2_id;
            tempMatchups2[match].team2_id = temp;
            console.log("Lösung neuer ansatz: ", tempMatchups2);
            return tempMatchups2;
          }
        } else if (tempMatchups2[match].team1_id === validOpponentsArr[j]) {
          if (
            !alreadyPlayed(
              teams.filter(
                (team) => team.teamid === tempMatchups2[match].team2_id
              )[0]
            ).includes(tempMatchups2[i].team2_id)
          ) {
            let temp = tempMatchups2[i].team2_id;
            tempMatchups2[i].team2_id = tempMatchups2[match].team1_id;
            tempMatchups2[match].team1_id = temp;
            console.log("Lösung neuer ansatz: ", tempMatchups2);
            return tempMatchups2;
          }
        }
      }
    }
  }

  function fixPlayedTwice(
    matchups: Array<BPMatch>,
    validOpponents: Array<ValidOpponents>
  ) {
    let tempMatchups = JSON.parse(JSON.stringify(matchups));

    for (let i = 0; i < tempMatchups.length; i++) {
      if (
        alreadyPlayed(
          teams.filter((team) => team.teamid === tempMatchups[i].team1_id)[0]
        ).includes(tempMatchups[i].team2_id)
      ) {
        console.log("DUPLICATE MATCH DETECTED");
        console.log(tempMatchups, i);
        let validOpponentsArr = validOpponents.filter(
          (team) => +Object.keys(team)[0] === tempMatchups[i].team1_id
        )[0][tempMatchups[i].team1_id];
        tempMatchups = newMatchup(validOpponentsArr, tempMatchups, i);
      }
    }
    return tempMatchups;
  }

  function checkGroupForRebuild(group: number, table: Array<TableRow>): number {
    let numMatches: number = 0;
    let numMatchesTable: number = 0;
    for (let match in matches) {
      if (matches[match].group === group) {
        if (!matches[match].end_ts) {
          return -1;
        }
        numMatches++;
      }
    }
    for (let row in table) {
      numMatchesTable += table[row].wins + table[row].losses;
    }
    if (numMatchesTable / 2 === numMatches) {
      return numMatches;
    } else {
      return -1;
    }
  }
  function matchupTeams(
    table: Array<TableRow>,
    group: number,
    matchNum: number
  ) {
    if (
      matchNum === -1 ||
      !Object.values(recalcBreakpoints).includes(matchNum)
    ) {
      return;
    }
    let tempTable = JSON.parse(JSON.stringify(table));
    let matchups: Array<BPMatch> = [];
    let startTable = 0;
    if (group === 0 || group === 1) {
      startTable = 1;
    } else if (group === 2 || group === 3) {
      startTable = 9;
    }
    if (matchNum === 30 && group === 1) {
      startTable = 4;
    }
    if (matchNum === 30 && group === 3) {
      startTable = 12;
    }
    for (let bp in groupBreakpoints[matchNum]) {
      let subtable: Array<TableRow> = tempTable.slice(
        groupBreakpoints[matchNum][bp][0],
        groupBreakpoints[matchNum][bp][1]
      );
      let submatchups = [];
      let teamids = subtable.map((row) => row.teamid);
      let validOpponents = teamids.map((id) => {
        return {
          [id]: teamids.filter(
            (iid) =>
              !alreadyPlayed(
                teams.filter((team) => team.teamid === id)[0]
              ).includes(iid) && iid !== id
          ),
        };
      });
      for (let i = 0; i < subtable.length / 2; i++) {
        submatchups.push({
          match_id: matches.length + submatchups.length + matchups.length + 1,
          bp_id: 1,
          team1_id: subtable[i].teamid,
          team2_id: subtable[subtable.length - i - 1].teamid,
          group: group,
          table_id: startTable++,
        });
      }

      matchups.push(...fixPlayedTwice(submatchups, validOpponents));
      console.log(submatchups);
    }
    addMatches.mutate({ matches: matchups });
  }
}
