import { useEvent, useTeams } from "../hooks/queries";
import { useNavigate } from "react-router-dom";
import img from "../assets/index";
import { EventProps } from "../types";
import dayjs from "dayjs";
function Bierpong(props: EventProps) {
  const turnier = useEvent("bierpong", props.eventid);
  const teams = useTeams(turnier.data?.bpid, turnier.isSuccess);
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 h-screen flex items-center flex-col">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-slate-800 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/events")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
      <div className="text-5xl text-white my-8 font-georgia tracking-widest">
        BIERPONGTURNIER
      </div>
      {teams.isSuccess && turnier.isSuccess ? (
        <div className="flex justify-evenly w-full">
          <div className="text-3xl text-white  flex flex-col items-center">
            <div className="">WANN?</div>
            <div>
              Am{" "}
              {dayjs(props.start).format("DD.MM.YYYY") +
                " um " +
                dayjs(props.start).format("HH:mm")}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl text-white">
              Anzahl Teams: {teams.isSuccess && teams.data.length}
            </div>
            <div className="text-white text-2xl">
              Freie Plätze:{" "}
              {teams.isSuccess && turnier.data.teams_amt - teams.data.length}
            </div>
          </div>
        </div>
      ) : null}
      <div className="text-3xl py-36 text-white">
        TODO: INTERESSANTE INFOS ZUM TURNIER
      </div>
      <div className="w-full flex justify-evenly text-md text-white">
        <div className="flex bg-slate-800 rounded-lg w-64 h-32 drop-shadow-lg shadow-black justify-center items-center text-center cursor-not-allowed">
          Anmelden <br /> (Anmeldung aktuell nur über Instagram!)
        </div>
        <span>{"<---XOR--->"}</span>
        <div
          className="flex bg-slate-800 rounded-lg w-64 h-32 drop-shadow-lg hover:drop-shadow-xl shadow-black justify-center items-center text-center cursor-pointer"
          onClick={() => navigate("standings")}
        >
          Standings <br /> (Turnierinstanz noch nicht erstellt!)
        </div>
      </div>
    </div>
  );
}
export default Bierpong;
