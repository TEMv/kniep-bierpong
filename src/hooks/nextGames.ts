import { useState, useEffect } from "react";
import {
  BPMatch,
  BPTeamResponse,
  BPTables,
  TableRow,
  ValidOpponents,
} from "../types";
import { recalcBreakpoints, groupBreakpoints } from "../constants";
import { useAddMatches } from "./queries";
import { useQueryClient } from "@tanstack/react-query";
export function useNextGames(
  teams: Array<BPTeamResponse>,
  matches: Array<BPMatch>,
  tableState: BPTables,
  bpid: number,
  enabled: boolean
) {
  const queryClient = useQueryClient();
  const addMatches = useAddMatches(bpid, queryClient);
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
  }, [matches, tableState]);
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
  function calcNextGames() {
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
  /*
Denkansatz: alle matches durchgehen, für jede gruppe prüfen: noch ungespielte games vorhanden
Falls ja: nichts tun, falls nein: neuberechnen
Wenn neuberechnet, in DB schreiben direkt und matches neu fetchen
*/

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
    /*if (i + 1 === tempMatchups.length) {
          for (let k = i - 1; k >= 0; k--) {
            if (
              !alreadyPlayed(
                teams.filter(
                  (team) => team.teamid === tempMatchups[i].team1_id
                )[0]
              ).includes(tempMatchups[k].team2_id) &&
              !alreadyPlayed(
                teams.filter(
                  (team) => team.teamid === tempMatchups[k].team1_id
                )[0]
              ).includes(tempMatchups[i].team2_id)
            ) {
              let temp = tempMatchups[i].team2_id;
              tempMatchups[i].team2_id = tempMatchups[k].team2_id;
              tempMatchups[k].team2_id = temp;
              console.log(tempMatchups, "fixed in line 86");
              break;
            }
          }
        } else {
          for (let k = i + 1; k < tempMatchups.length; k++) {
            if (
              !alreadyPlayed(
                teams.filter(
                  (team) => team.teamid === tempMatchups[i].team1_id
                )[0]
              ).includes(tempMatchups[k].team2_id) &&
              !alreadyPlayed(
                teams.filter(
                  (team) => team.teamid === tempMatchups[k].team1_id
                )[0]
              ).includes(tempMatchups[i].team2_id)
            ) {
              let temp = tempMatchups[i].team2_id;
              tempMatchups[i].team2_id = tempMatchups[k].team2_id;
              tempMatchups[k].team2_id = temp;
              console.log(tempMatchups, "fixed in line 100");
              break;
            } else if (k + 1 === tempMatchups.length) {
              console.log("K ist letzter Eintrag, schaue 1 vor dupe game");
              // wenn vorletzter eintrag und letzter auch nicht valide
              //den eintrag vor i nachschauen (3 tries gesamt), wenn auch nicht possible dann scheiß drauf
              if (
                !alreadyPlayed(
                  teams.filter(
                    (team) => team.teamid === tempMatchups[i].team1_id
                  )[0]
                ).includes(tempMatchups[i - 1].team2_id) &&
                !alreadyPlayed(
                  teams.filter(
                    (team) => team.teamid === tempMatchups[i - 1].team1_id
                  )[0]
                ).includes(tempMatchups[i].team2_id)
              ) {
                let temp = tempMatchups[i].team2_id;
                tempMatchups[i].team2_id = tempMatchups[i - 1].team2_id;
                tempMatchups[i - 1].team2_id = temp;
                console.log(tempMatchups, "fixed in line 115");
                break;
              } else {
                return tempMatchups;
              }
            }
          }
        }
      }
    }
    console.log("Lösung alter ansatz: ", tempMatchups);*/
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
