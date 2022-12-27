import { useState, useEffect } from "react";
import Table from "../components/Table";
import { useTeams, useMatches } from "../hooks/queries";
import { useTableState } from "../hooks/tableState";
import img from "../assets/index";
import { BPMatch, NextGameMap, BPTeamResponse } from "../types";
import { koMatches } from "../constants";

function Standings(props: any) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const teams = useTeams(props.eventid, true);
  const matches = useMatches(props.eventid);
  const tableState = useTableState(
    teams.data,
    matches.data,
    teams.isSuccess && matches.isSuccess
  );
  let isKO = matches.isSuccess && matches.data.length > 132;
  let isOver =
    matches.isSuccess &&
    matches.data.filter((match: any) => match.winner_id).length === 163;

  useEffect(() => {
    //const interval = setInterval(() => {
    //  setCurrentPage((old) => (old + 1) % (isKO ? 2 : 3));
    //  matches.refetch();
    //}, 5000);
    //return () => clearInterval(interval);
  }, []);

  const PageOne = () => {
    return (
      <div className="flex flex-col justify-end pb-16 h-screen items-center w-full">
        <div className="text-5xl text-white my-4 font-georgia tracking-widest">
          Tabellen A + C
        </div>
        <div className="flex mx-2 w-full">
          <Table data={tableState.tableA} title="Gruppe A" size="lg" />
          <Table data={tableState.tableC} title="Gruppe C" size="lg" />
        </div>
      </div>
    );
  };
  const PageTwo = () => {
    return (
      <div className="flex flex-col justify-end pb-16 h-screen items-center w-full">
        <div className="text-5xl text-white my-4 font-georgia tracking-widest">
          Tabellen B + D
        </div>
        <div className="flex mx-2 w-full">
          <Table data={tableState.tableB} title="Gruppe B" size="lg" />
          <Table data={tableState.tableD} title="Gruppe D" size="lg" />
        </div>
      </div>
    );
  };
  const PageThree = () => {
    //get queued matches
    let queuedMatches: Array<BPMatch> = [];
    for (let match in matches.data) {
      if (!matches.data[match].winner_id) {
        queuedMatches.push(matches.data[match]);
      }
    }
    //get active matches from queued matches
    let activeMatches: Array<BPMatch> = [];
    let activeTables: Array<number> = [];
    for (let match in queuedMatches) {
      if (!activeTables.includes(queuedMatches[match].table_id)) {
        activeMatches.push(queuedMatches[match]);
        activeTables.push(queuedMatches[match].table_id);
      }
    }
    activeMatches.sort((a, b) => a.table_id - b.table_id);
    return (
      <div className="text-4xl flex flex-col justify-end pb-10 h-screen items-center text-white">
        <div className="text-5xl text-white my-4 font-georgia tracking-widest">
          Tischplan
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-col">
            {activeMatches.slice(0, 8).map((match, index) => (
              <div
                className="w-64 bg-slate-800 rounded-lg my-3 relative px-2 mr-8 border  border-slate-400 h-20 text-base text-center"
                key={index}
              >
                <span className="animate-ping absolute -left-1 -top-1 inline-flex h-3 w-3 rounded-full bg-emerald-700 opacity-75"></span>
                <span className="absolute -left-1 -top-1 inline-flex rounded-full h-3 w-3 bg-emerald-700"></span>
                <div className="border-b border-slate-400 h-8">
                  Tisch {match.table_id}
                </div>
                <div className="flex justify-between h-12 items-center mx-2 text-sm ">
                  <div className=" line-clamp-2 w-28 pr-2">
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: any) => team.teamid === match.team1_id
                      )[0]?.teamname}
                  </div>
                  <div>-</div>
                  <div className=" line-clamp-2 w-28 pl-2">
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: any) => team.teamid === match.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img
            src={img.Images.Kniepe}
            className=" w-1/2 block max-w-4xl "
            alt="Kniepe"
          />
          <div className="flex flex-col">
            {activeMatches
              .slice(8, activeMatches.length)
              .map((match, index) => (
                <div
                  className="w-64 bg-slate-800 my-3 relative ml-8 px-2 rounded-lg border  border-slate-400 h-20 text-base text-center"
                  key={index}
                >
                  <span className="animate-ping absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-emerald-700 opacity-75"></span>
                  <span className="absolute -right-1 -top-1 inline-flex rounded-full h-3 w-3 bg-emerald-700"></span>
                  <div className="border-b border-slate-400 h-8">
                    Tisch {match.table_id}
                  </div>
                  <div className="flex justify-between h-12 items-center mx-2 text-sm ">
                    <div className=" line-clamp-2 w-28 pr-2">
                      {teams.isSuccess &&
                        teams.data.filter(
                          (team: any) => team.teamid === match.team1_id
                        )[0]?.teamname}
                    </div>
                    <div>-</div>
                    <div className=" line-clamp-2 w-28 pl-2">
                      {teams.isSuccess &&
                        teams.data.filter(
                          (team: any) => team.teamid === match.team2_id
                        )[0]?.teamname}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
  const PageFour = () => {
    let koGames = matches.data.filter((match: any) => match.group >= 10);
    console.log(koGames);
    return (
      <div className="text-4xl flex flex-col items-center  bg-slate-900 w-[1920px] text-white">
        <div className="flex w-full justify-evenly">
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">KO-2</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(8).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 px-2  rounded-lg h-14 my-6`}
                >
                  <div
                    className={`h-7 border-b text-lg truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 10 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 10 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 10 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 10 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 10 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-7  text-lg truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 10 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 10 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 10 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 10 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 10 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Achtel</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(4).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 px-2 rounded-lg h-20 my-14`}
                >
                  <div
                    className={`h-10 leading-10 border-b  text-xl truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 26 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 26 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 26 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 26 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 26 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-10 leading-10  text-xl truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 26 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 26 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 26 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 26 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 26 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Viertel</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(2).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 rounded-lg h-20 px-2 my-44`}
                >
                  <div
                    className={`h-10 leading-10  border-b text-lg truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 34 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 34 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 34 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 34 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 34 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-10 leading-10 text-lg truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 34 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 34 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 34 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 34 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 34 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Halb</div>
            <div className="flex flex-col h-full justify-evenly">
              <div
                key={"halb1"}
                className={` w-40 bg-slate-800 rounded-lg h-20 px-2 my-44`}
              >
                <div
                  className={`h-10 leading-10 border-b text-lg truncate border-slate-400 ${
                    koGames.filter((match: BPMatch) => match.group === 38)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 38)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 38)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 38)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 38
                        )[0]?.team1_id
                    )[0]?.teamname}
                </div>
                <div
                  className={`h-10 leading-10  text-lg truncate  ${
                    koGames.filter((match: BPMatch) => match.group === 38)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 38)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 38)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 38)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 38
                        )[0]?.team2_id
                    )[0]?.teamname}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Finale</div>
            <div className="flex flex-col justify-evenly h-full">
              <div
                key={"finale"}
                className={` w-40 bg-slate-800 rounded-lg h-24 px-2 my-44`}
              >
                <div
                  className={`h-12 leading-[2.75rem] border-b text-lg truncate border-slate-400 ${
                    koGames.filter((match: BPMatch) => match.group === 40)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 40)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 40)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 40)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 40
                        )[0]?.team1_id
                    )[0]?.teamname}
                </div>
                <div
                  className={`h-12 leading-[2.75rem] text-lg truncate  ${
                    koGames.filter((match: BPMatch) => match.group === 40)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 40)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 40)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 40)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 40
                        )[0]?.team2_id
                    )[0]?.teamname}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Halb</div>
            <div className="flex flex-col h-full justify-evenly">
              <div
                key={"halb1"}
                className={` w-40 bg-slate-800 rounded-lg h-20 px-2 my-44`}
              >
                <div
                  className={`h-10 leading-10  border-b text-lg truncate border-slate-400 ${
                    koGames.filter((match: BPMatch) => match.group === 39)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 39)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 39)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 39)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 39
                        )[0]?.team1_id
                    )[0]?.teamname}
                </div>
                <div
                  className={`h-10 leading-10 text-lg truncate  ${
                    koGames.filter((match: BPMatch) => match.group === 39)[0]
                      ?.team2_id ===
                      koGames.filter((match: BPMatch) => match.group === 39)[0]
                        ?.winner_id && "text-emerald-700"
                  } ${
                    koGames.filter((match: BPMatch) => match.group === 39)[0]
                      ?.team1_id ===
                      koGames.filter((match: BPMatch) => match.group === 39)[0]
                        ?.winner_id && "text-red-500"
                  }`}
                >
                  {teams.isSuccess &&
                    teams.data.filter(
                      (team: BPTeamResponse) =>
                        team.teamid ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 39
                        )[0]?.team2_id
                    )[0]?.teamname}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Viertel</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(2).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 rounded-lg h-20 px-2 my-44`}
                >
                  <div
                    className={`h-10 leading-10 border-b text-lg truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 36 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 36 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 36 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 36 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 36 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-10 leading-10 text-lg truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 36 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 36 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 36 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 36 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 36 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">Achtel</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(4).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 px-2 rounded-lg h-20 my-14`}
                >
                  <div
                    className={`h-10 leading-10 text-lg border-b truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 30 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 30 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 30 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 30 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 30 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-10 leading-10 text-lg truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 30 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 30 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 30 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 30 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 30 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex justify-center">KO-2</div>
            <div className="flex flex-col h-full justify-evenly">
              {Array.from(Array(8).keys()).map((id) => (
                <div
                  key={id + 1}
                  className={` w-40 bg-slate-800 px-2  rounded-lg h-14 my-6`}
                >
                  <div
                    className={`h-7 border-b text-lg truncate border-slate-400 ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 18 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 18 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 18 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 18 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 18 + id
                          )[0]?.team1_id
                      )[0]?.teamname}
                  </div>
                  <div
                    className={`h-7  text-lg truncate  ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 18 + id
                      )[0]?.team2_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 18 + id
                        )[0]?.winner_id && "text-emerald-700"
                    } ${
                      koGames.filter(
                        (match: BPMatch) => match.group === 18 + id
                      )[0]?.team1_id ===
                        koGames.filter(
                          (match: BPMatch) => match.group === 18 + id
                        )[0]?.winner_id && "text-red-500"
                    }`}
                  >
                    {teams.isSuccess &&
                      teams.data.filter(
                        (team: BPTeamResponse) =>
                          team.teamid ===
                          koGames.filter(
                            (match: BPMatch) => match.group === 18 + id
                          )[0]?.team2_id
                      )[0]?.teamname}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const PageFive = () => {
    return <div>over</div>;
  };
  return (
    <div
      className="bg-slate-900 h-screen w-full flex items-center flex-col"
      onClick={() => {
        setCurrentPage((old) => (old + 1) % (isKO ? 2 : 3));
      }}
    >
      <div className="w-full">
        {teams.isSuccess && matches.isSuccess && !isOver ? (
          <>
            {currentPage === 0 && (!isKO ? <PageOne /> : <PageThree />)}
            {currentPage === 1 && (!isKO ? <PageTwo /> : <PageFour />)}
            {currentPage === 2 && (!isKO ? <PageThree /> : null)}
          </>
        ) : null}
        {isOver && <PageFive />}
      </div>
    </div>
  );
}
export default Standings;
