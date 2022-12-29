import { BPMatch, BPTeamResponse } from "../../types";
import { useTischState } from "../../hooks/tische";
import Modal from "../Modal";
import { useState } from "react";
import { GroupMap } from "../../constants";
function MatchEditor(props: {
  matches: Array<BPMatch>;
  teams: Array<BPTeamResponse>;
  bpid: number;
}) {
  const tische = useTischState(props.matches);
  const [enterModalVisible, setEnterModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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
    setEnterModalVisible(true);
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
              className="w-64 bg-slate-800 relative px-2 rounded-lg border border-slate-400 h-20 text-base text-center cursor-pointer"
              key={index}
              onClick={() => handleMatchClick(tisch.match_id)}
            >
              <div className="border-b flex justify-center items-center border-slate-400 h-8">
                Tisch {index + 1} -{" "}
                {GroupMap[
                  props.matches?.filter(
                    (match) => match.match_id === tisch.match_id
                  )[0]?.group
                ] ||
                  (props.matches?.filter(
                    (match) => match.match_id === tisch.match_id
                  )[0]?.group > 10 &&
                    "KO")}
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
        <div
          className={`flex-col flex items-center mx-2 ${
            props.matches?.filter((match) => match.winner_id).length === 163
              ? "justify-between"
              : "justify-end"
          }`}
        >
          <Modal
            modalVisible={enterModalVisible}
            setModalVisible={setEnterModalVisible}
            title="Ergebnis eintragen"
            type="enter-results"
            bpid={props.bpid}
            data={currentModalData}
            overtimeTables={tische.slice(16, 18)}
          />
          {props.matches?.filter((match) => match.winner_id).length === 163 && (
            <div className="flex flex-col items-center justify-center mt-8 text-emerald-700">
              <div>Gewinner</div>
              <div>
                {
                  props.teams.filter(
                    (team) =>
                      team.teamid ===
                      props.matches[props.matches.length - 1].winner_id
                  )[0].teamname
                }
              </div>
            </div>
          )}
          {false && (
            <div
              onClick={() => setEditModalVisible(true)}
              className="w-64 bg-slate-800 rounded-lg mb-14 border text-red-400 border-slate-400 text-center cursor-pointer text-2xl py-2"
            >
              Ergebnisse bearbeiten
            </div>
          )}
          <Modal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            title="Ergebnisse bearbeiten"
            type="edit-results"
            bpid={props.bpid}
            data={{ matches: props.matches, teams: props.teams }}
          />
          <div>
            {tische.slice(16, 18).map((tisch, index) => (
              <div
                className="w-64 bg-slate-800 mb-6 relative px-2 rounded-lg border border-slate-400 h-20 text-base text-center cursor-pointer"
                key={index}
                onClick={() => handleMatchClick(tisch.match_id)}
              >
                <div className="border-b flex justify-center items-center border-slate-400 h-8">
                  Tisch {index + 17} -{" "}
                  {GroupMap[
                    props.matches?.filter(
                      (match) => match.match_id === tisch.match_id
                    )[0]?.group
                  ] ||
                    (props.matches?.filter(
                      (match) => match.match_id === tisch.match_id
                    )[0]?.group > 10 &&
                      "KO")}
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
        {/*Right Row */}
        <div className="mr-4 flex justify-evenly flex-col">
          {tische.slice(8, 16).map((tisch, index) => (
            <div
              className="w-64 bg-slate-800 rounded-lg border px-2 cursor-pointer border-slate-400 h-20 text-base text-center"
              key={index + 8}
              onClick={() => handleMatchClick(tisch.match_id)}
            >
              <div className="border-b border-slate-400 h-8">
                Tisch {index + 9} -{" "}
                {GroupMap[
                  props.matches?.filter(
                    (match) => match.match_id === tisch.match_id
                  )[0]?.group
                ] ||
                  (props.matches?.filter(
                    (match) => match.match_id === tisch.match_id
                  )[0]?.group > 10 &&
                    "KO")}
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
