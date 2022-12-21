import { BPMatch } from "../../types";
import { useEffect, useState } from "react";
function MatchEditor(props: { matches: Array<BPMatch> }) {
  const [activeMatches, setActiveMatches] = useState<Array<BPMatch>>(
    props.matches?.slice(0, 16)
  );
  //get first 16 games that are not done yet
  function getActiveMatches() {
    let tempMatchArr = [];

    for (let i = 0; i < props.matches?.length; i++) {
      if (!props.matches[i].end_ts) {
        tempMatchArr.push(props.matches[i]);
      }
      if (tempMatchArr.length === 16) {
        break;
      }
    }
    setActiveMatches(tempMatchArr);
  }

  useEffect(() => {
    getActiveMatches();
  }, [props.matches]);
  /*
  TODO: State der Tische erfassen mit tischnr, state (frei, occupied, game running), matchid falls occ oder running
  DANN: Auf Basis von Tische State die freien Tische mit den nächsten Matches auffüllen, Tisch 17 18 beachten bei Verlängerung
  DANN: Bei richtig zugeordneten Tischen -> Matches vernünftig anzeigen und Startbutton -> start timestamp in DB, 
        danach Ergebnis in Modal eintragen
  DANN: Bei Ergebnis Tisch state verändern und Tischzuordnung laufen lassen etc.
  */
  return (
    <div className="text-white text-3xl py-4 flex flex-col items-center  h-screen">
      <h1>MATCHEDITOR</h1>
      {/*Body*/}
      <div className="flex w-full justify-between h-full">
        {/*Left Row */}
        <div className="ml-4 flex justify-evenly flex-col">
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 1</div>
            <div className="flex justify-between mx-2 my-2 text-sm">
              <div>Elfbier</div>
              <div>-</div>
              <div>Rossko</div>
            </div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 2</div>
            <div className="flex justify-between mx-2 text-sm ">
              <div className=" line-clamp-2 w-24 pr-2"> 2 Monkeys 1 Sieg</div>
              <div>-</div>
              <div className=" line-clamp-2 w-24 pl-2">
                colakornistbesseralstee
              </div>
            </div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 3</div>
            <div>Elfbier - Rossko</div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 4</div>
            <div>Elfbier - Rossko</div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 5</div>
            <div>Elfbier - Rossko</div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 6</div>
            <div>Elfbier - Rossko</div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 7</div>
            <div>Elfbier - Rossko</div>
          </div>
          <div className="w-56 rounded-lg border border-slate-400 h-16 text-base text-center">
            <div className="border-b border-slate-400">Tisch 8</div>
            <div>Elfbier - Rossko</div>
          </div>
        </div>
        {/*Middle Row */}
        <div>Mid</div>
        {/*Right Row */}
        <div className="mr-4 flex justify-evenly flex-col">
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 9
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 10
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 11
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 12
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 13
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 14
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 15
          </div>
          <div className="w-40 bg-red-500 h-16 text-base text-center">
            Tisch 16
          </div>
        </div>
      </div>
    </div>
  );
}
export default MatchEditor;
