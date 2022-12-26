import { useState, useEffect } from "react";
import { ModalContentType, BPTeamValues, TischState } from "../types";
import { useEditTeam, useEnterResult, useChangeTable } from "../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
function Modal(props: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  data: any;
  type: ModalContentType;
  bpid: number;
  overtimeTables?: Array<TischState>;
}) {
  const overtimeTablesFree =
    !!props.overtimeTables &&
    (props.overtimeTables[0].status === "free" ||
      props.overtimeTables[1].status === "free");
  const [content, setContent] = useState(<></>);
  const [inputEdited, setInputEdited] = useState<boolean>(false);
  const [t1winner, setT1Winner] = useState<boolean>(true);
  const [cupDiff, setCupDiff] = useState<number>(1);
  const queryClient = useQueryClient();
  const resultMutation = useEnterResult(props.bpid, queryClient);
  const editTeamMutation = useEditTeam(props.bpid, queryClient);
  const changeTable = useChangeTable(props.bpid, queryClient);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<BPTeamValues>({
    teamname: { value: "", status: "valid" },
    p1: { value: "", status: "valid" },
    p2: { value: "", status: "valid" },
    ids: { team: 0, p1: 0, p2: 0 },
  });

  useEffect(() => {
    setT1Winner(true);
    setCupDiff(1);
  }, [props.modalVisible]);

  useEffect(() => {
    switch (props.type) {
      case "edit-teams":
        setContent(
          <div className="relative p-6 flex-auto justify-between flex max-h-140 w-160 overflow-y-scroll scrollbar">
            <div className="w-68">
              {props.data
                .slice(0, props.data.length / 2)
                .map((entry: any, index: number) => (
                  <div
                    key={entry.teamid}
                    onClick={() => openTeam(entry)}
                    className={`py-1 rounded-lg flex hover:text-primary cursor-pointer ${
                      index % 2 === 0 ? "bg-slate-700" : ""
                    }`}
                  >
                    <div className="rounded-lg w-8 h-8 min-w-8 text-center border-slate-200 border ">
                      {" "}
                      {index + 1}
                    </div>
                    <div className="ml-4 w-64 truncate">{entry.teamname}</div>
                  </div>
                ))}
            </div>
            <div className="w-68">
              {props.data
                .slice(props.data.length / 2, props.data.length)
                .map((entry: any, index: number) => (
                  <div
                    key={entry.teamid}
                    onClick={() => openTeam(entry)}
                    className={`py-1 rounded-lg flex  hover:text-primary cursor-pointer ${
                      index % 2 === 1 ? "bg-slate-700" : ""
                    }`}
                  >
                    <div className="rounded-lg w-8 h-8 min-w-8 text-center border-slate-200 border ">
                      {" "}
                      {index + Math.floor(props.data.length / 2) + 1}
                    </div>
                    <div className="ml-4 w-64 truncate">{entry.teamname}</div>
                  </div>
                ))}
            </div>
          </div>
        );
        break;
      case "add-missing-teams":
        let inputs = [];
        for (let i = 0; i < 64 - props.data.length; i++) {
          inputs.push(i);
        }
        if (inputs.length === 0) {
          setContent(
            <div className="p-6">Es sind bereits alle Teams registriert!</div>
          );
        } else {
          setContent(
            <div className="relative p-6 flex-auto justify-between flex max-h-140 w-160 overflow-y-scroll scrollbar">
              <div className="w-68">
                {inputs.slice(0, inputs.length / 2).map((input: number) => (
                  <div
                    key={input}
                    onClick={() =>
                      openTeam({
                        teamid: 0,
                        teamname: "",
                        players: {
                          p1: { playerid: 0, teamid: 0, name: "" },
                          p2: { playerid: 0, teamid: 0, name: "" },
                        },
                      })
                    }
                    className={`py-1 border-white border text-center justify-center my-1 flex hover:text-primary cursor-pointer ${
                      input % 2 === 0 ? "bg-slate-700" : ""
                    }`}
                  >
                    [+]
                  </div>
                ))}
              </div>
              <div className="w-68">
                {inputs.slice(inputs.length / 2, inputs.length).map((input) => (
                  <div
                    key={input}
                    onClick={() =>
                      openTeam({
                        teamid: 0,
                        teamname: "",
                        players: {
                          p1: { playerid: 0, teamid: 0, name: "" },
                          p2: { playerid: 0, teamid: 0, name: "" },
                        },
                      })
                    }
                    className={`py-1 border-white border text-center justify-center my-1 flex hover:text-primary cursor-pointer ${
                      input % 2 === 1 ? "bg-slate-700" : ""
                    }`}
                  >
                    [+]
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      case "enter-results":
        setContent(
          <div className="flex flex-col">
            <div className="flex items-center justify-evenly w-160">
              <div
                onClick={() => setT1Winner(true)}
                className={`rounded-lg flex text-3xl cursor-pointer border border-slate-700 text-center justify-center items-center h-16 w-80 px-2  m-2 ${
                  t1winner ? "bg-emerald-700" : "bg-slate-700"
                }`}
              >
                <span>{props.data?.teams?.team1?.teamname}</span>
              </div>
              <div>-</div>
              <div
                onClick={() => setT1Winner(false)}
                className={`rounded-lg flex text-3xl cursor-pointer border border-slate-700 text-center justify-center items-center h-16 w-80 px-2  m-2 ${
                  t1winner ? "bg-slate-700" : "bg-emerald-700"
                }`}
              >
                <div>{props.data?.teams?.team2?.teamname}</div>
              </div>
            </div>
            <div className="flex flex-row w-160 mt-8">
              <div
                className={`rounded-lg border border-slate-700 p-1 text-2xl w-80 m-2`}
              >
                Becherdifferenz
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={cupDiff}
                  onChange={(e) => setCupDiff(+e.target.value)}
                  className={`w-20 text-slate-800 text-center  ml-8 px-2 py-1 rounded-lg`}
                />
              </div>
              {props.data?.match?.table_id <= 16 && (
                <div
                  onClick={() =>
                    overtimeTablesFree
                      ? sendToOvertime(props.data?.match?.match_id)
                      : null
                  }
                  className={` flex text-3xl border border-slate-700 items-center justify-center w-80 rounded-lg grow m-2 bg-red-500 ${
                    overtimeTablesFree ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <div>Overtime</div>
                </div>
              )}
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  }, [props.type, props.data, t1winner, cupDiff]);

  function submitResult() {
    if (cupDiff < 1 || cupDiff > 10) {
      console.log("CupDiff invalid");
      return;
    }

    resultMutation.mutate({
      winner_id: t1winner
        ? props.data?.teams?.team1?.teamid
        : props.data?.teams?.team2?.teamid,
      match_id: props.data?.match?.match_id,
      cup_diff: cupDiff,
    });
    props.setModalVisible(false);
  }

  /*
    TODO: Finish Submit Results, api erweitern, an Overtime Button denken!
    DANN: TESTEN! ersten 32 matches durchspielen und fehler finden
    DANN: Bei Erfolg: Nach 16 matches in Gruppenphase neue Begegnungen generieren. 
    DANN: Testen, GANZE Gruppenphase durchspielen
    DANN: Bei Erfolg, Abläufe für KO-Phase definieren, Qualifiziert / Nicht Qualifiziert grün / rot markieren, bei rausfliegen in 
          KO Phase entsprechend einfärben!
   */

  const openTeam = (entry: any) => {
    setInputValues({
      teamname: { value: entry.teamname || "", status: "valid" },
      p1: { value: entry.players?.p1?.name || "", status: "valid" },
      p2: { value: entry.players?.p2?.name || "", status: "valid" },
      ids: {
        team: entry.teamid || 0,
        p1: entry.players?.p1?.playerid || 0,
        p2: entry.players?.p2?.playerid || 0,
      },
    });
    setInputVisible(true);
  };

  function sendToOvertime(match_id: number) {
    let new_table = -1;
    if (!!props.overtimeTables) {
      if (props.overtimeTables[0].status === "free") {
        new_table = props.overtimeTables[0].tisch_nr;
      } else if (props.overtimeTables[1].status === "free") {
        new_table = props.overtimeTables[1].tisch_nr;
      }
    }
    if (new_table > 0) {
      changeTable.mutate({ match_id: match_id, new_table: new_table });
      props.setModalVisible(false);
    }
  }

  const handleInput = (value: string, id: string) => {
    setInputEdited(true);
    setInputValues({ ...inputValues, [id]: { value: value, status: "valid" } });
  };
  const submitTeam = () => {
    if (inputValues.teamname.value === "") {
      setInputValues({
        ...inputValues,
        teamname: { value: "", status: "warning" },
      });
    }
    if (inputValues.p1.value === "") {
      setInputValues({
        ...inputValues,
        p1: { value: "", status: "warning" },
      });
    }
    if (inputValues.p2.value === "") {
      setInputValues({
        ...inputValues,
        p2: { value: "", status: "warning" },
      });
    }
    if (
      inputValues.p2.value === "" ||
      inputValues.p1.value === "" ||
      inputValues.teamname.value === ""
    ) {
      return;
    }
    if (inputEdited) {
      editTeamMutation.mutate(inputValues);
      setInputVisible(false);
    } else {
      console.log("nothing changed");
    }
  };
  return (
    <>
      {props.modalVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-200  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setModalVisible(false)}
                  >
                    <span className="bg-transparent text-slate-200 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {content}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-600 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setModalVisible(false)}
                  >
                    Schliessen
                  </button>
                  {props.type === "enter-results" && (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => submitResult()}
                    >
                      Abschicken
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
        </>
      ) : null}
      {inputVisible ? (
        <>
          <div className="justify-center drop-shadow-2xl items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t">
                  <h3 className="text-3xl font-semibold">Bearbeiten</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-200  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setInputVisible(false)}
                  >
                    <span className="bg-transparent text-slate-200 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="text-black">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-200 ml-2">Teamname</div>
                    <input
                      placeholder="Teamname"
                      className={
                        "m-2 rounded px-2  w-64 h-8  focus:outline-none " +
                        (inputValues.teamname.status === "warning"
                          ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
                          : "")
                      }
                      value={inputValues.teamname.value}
                      onChange={(e) => handleInput(e.target.value, "teamname")}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-slate-200 ml-2">Spieler 1</div>
                      <input
                        placeholder="Spieler 1"
                        className={
                          "m-2 rounded px-2  w-64 h-8  focus:outline-none " +
                          (inputValues.p1.status === "warning"
                            ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
                            : "")
                        }
                        value={inputValues.p1.value}
                        onChange={(e) => handleInput(e.target.value, "p1")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-slate-200 ml-2">Spieler 2</div>
                      <input
                        placeholder="Spieler 2"
                        className={
                          "m-2 rounded px-2  w-64 h-8  focus:outline-none " +
                          (inputValues.p2.status === "warning"
                            ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
                            : "")
                        }
                        value={inputValues.p2.value}
                        onChange={(e) => handleInput(e.target.value, "p2")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-600 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setInputVisible(false)}
                  >
                    Schliessen
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => submitTeam()}
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default Modal;
