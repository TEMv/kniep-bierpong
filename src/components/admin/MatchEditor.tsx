import { BPMatch, BPTeamResponse } from "../../types";
import { useTischState } from "../../hooks/tische";
import Modal from "../Modal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
function MatchEditor(props: {
  matches: Array<BPMatch>;
  teams: Array<BPTeamResponse>;
  bpid: number;
}) {
  const tische = useTischState(props.matches);
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentModalData, setCurrentModalData] = useState({
    match: {},
    teams: { team1: {}, team2: {} },
  });
  /*
  TODO: State der Tische erfassen mit tischnr, state (frei, occupied, game running), matchid falls occ oder running DONE
  DANN: Auf Basis von Tische State die freien Tische mit den nächsten Matches auffüllen, Tisch 17 18 beachten bei Verlängerung DONE
  DANN: Bei richtig zugeordneten Tischen -> Matches vernünftig anzeigen und Startbutton -> start timestamp in DB, 
        danach Ergebnis in Modal eintragen DONE
  DANN: Bei Ergebnis Tisch state verändern und Tischzuordnung laufen lassen etc. DONE

  */
  function openModal(matchid: number) {
    let match = props.matches.filter((match) => match.match_id === matchid)[0];
    let team1 = props.teams.filter((team) => team.teamid === match.team1_id)[0];
    let team2 = props.teams.filter((team) => team.teamid === match.team2_id)[0];
    setCurrentModalData({
      match: match,
      teams: { team1: team1, team2: team2 },
    });
    setModalVisible(true);
  }
  function handleMatchClick(matchid: number) {
    if (matchid === -1) return;
    openModal(matchid);
  }

  return (
    <div className="text-white text-4xl py-4 flex flex-col items-center  h-screen">
      <h1>MATCHEDITOR</h1>
      {/*Body*/}
      <div className="flex w-full justify-between h-full">
        {/*Left Row */}
        <div className="ml-4 flex justify-evenly flex-col">
          {tische.slice(0, 8).map((tisch, index) => (
            <div
              className="w-64 bg-slate-800 relative rounded-lg border border-slate-400 h-20 text-base text-center cursor-pointer"
              key={index}
              onClick={() => handleMatchClick(tisch.match_id)}
            >
              <div className="border-b flex justify-center items-center border-slate-400 h-8">
                Tisch {index + 1}
              </div>
              <div className="flex justify-between h-12 items-center mx-2 text-sm ">
                <div className=" line-clamp-2 w-28 pr-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team1_id
                    )[0]?.teamname
                  }
                </div>
                <div>-</div>
                <div className=" line-clamp-2 w-28 pl-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team2_id
                    )[0]?.teamname
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*Middle Row */}
        <div className="flex-col justify-end flex mx-2">
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title="Ergebnis eintragen"
            type="enter-results"
            bpid={props.bpid}
            data={currentModalData}
            overtimeTables={tische.slice(16, 18)}
          />

          {tische.slice(16, 18).map((tisch, index) => (
            <div
              className="w-64 bg-slate-800 mb-6 relative rounded-lg border border-slate-400 h-20 text-base text-center cursor-pointer"
              key={index}
              onClick={() => handleMatchClick(tisch.match_id)}
            >
              <div className="border-b flex justify-center items-center border-slate-400 h-8">
                Tisch {index + 17}
              </div>
              <div className="flex justify-between h-12 items-center mx-2 text-sm ">
                <div className=" line-clamp-2 w-28 pr-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team1_id
                    )[0]?.teamname
                  }
                </div>
                <div>-</div>
                <div className=" line-clamp-2 w-28 pl-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team2_id
                    )[0]?.teamname
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*Right Row */}
        <div className="mr-4 flex justify-evenly flex-col">
          {tische.slice(8, 16).map((tisch, index) => (
            <div
              className="w-64 bg-slate-800 rounded-lg border cursor-pointer border-slate-400 h-20 text-base text-center"
              key={index + 8}
              onClick={() => handleMatchClick(tisch.match_id)}
            >
              <div className="border-b border-slate-400 h-8">
                Tisch {index + 9}
              </div>
              <div className="flex justify-between h-12 items-center mx-2 text-sm ">
                <div className=" line-clamp-2 w-28 pr-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team1_id
                    )[0]?.teamname
                  }
                </div>
                <div>-</div>
                <div className=" line-clamp-2 w-28 pl-2">
                  {
                    props.teams?.filter(
                      (team) =>
                        team.teamid ===
                        props.matches?.filter(
                          (match) => match.match_id === tisch.match_id
                        )[0]?.team2_id
                    )[0]?.teamname
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MatchEditor;
