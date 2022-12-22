import { useState, useEffect } from "react";
import { BPMatch, TischState } from "../types";
import { emptyTische } from "../constants";
export function useTischState(matches: Array<BPMatch>) {
  const [tischState, setTischState] = useState<Array<TischState>>(emptyTische);
  useEffect(() => {
    handleTische();
  }, [matches]);
  function handleTische() {
    let tempTische: Array<TischState> = JSON.parse(JSON.stringify(tischState));
    for (let tisch in tempTische) {
      if (tempTische[tisch].status === "free") {
        for (let match in matches) {
          if (matches[match].table_id === tempTische[tisch].tisch_nr) {
            if (matches[match].end_ts) {
              continue;
            }
            if (matches[match].start_ts) {
              tempTische[tisch].status = "active";
              tempTische[tisch].match_id = matches[match].match_id;
              break;
            } else {
              tempTische[tisch].status = "reserved";
              tempTische[tisch].match_id = matches[match].match_id;
              break;
            }
          }
        }
      } else if (tempTische[tisch].status === "reserved") {
        let reserved_match: BPMatch = matches.filter(
          (match) => match.match_id === tempTische[tisch].match_id
        )[0];
        if (reserved_match.start_ts) {
          tempTische[tisch].status = "active";
        }
      } else if (tempTische[tisch].status === "active") {
        let active_match: BPMatch = matches.filter(
          (match) => match.match_id === tempTische[tisch].match_id
        )[0];

        console.log(active_match);
        if (
          active_match.end_ts ||
          active_match.table_id !== tempTische[tisch].tisch_nr
        ) {
          //falls zuende oder overtime
          // wenn spiel beendet ist, nächstes zum reservieren suchen
          for (let match in matches) {
            if (matches[match].table_id === tempTische[tisch].tisch_nr) {
              if (matches[match].end_ts) {
                // beendete skippen
                continue;
              }
              if (matches[match].start_ts) {
                //wenn schon gestartet und gleicher tisch (eig unlogisch)
                tempTische[tisch].status = "active";
                tempTische[tisch].match_id = matches[match].match_id;
                break;
              } else {
                // nächstes match queuen
                tempTische[tisch].status = "reserved";
                tempTische[tisch].match_id = matches[match].match_id;
                break;
              }
            }
          }
          if (active_match.match_id === tempTische[tisch].match_id) {
            // wenn kein nächstes match für tisch vorhergesehen ist
            tempTische[tisch].status = "free";
            tempTische[tisch].match_id = -1;
          }
        }
      }
    }
    setTischState(tempTische);
  }
  return tischState;
}
