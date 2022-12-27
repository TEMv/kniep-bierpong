import { useState, useEffect } from "react";
import Table from "../components/Table";
import { useTeams, useMatches } from "../hooks/queries";
import { useTableState } from "../hooks/tableState";
function Standings(props: any) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const teams = useTeams(props.eventid, true);
  const matches = useMatches(props.eventid);
  const tableState = useTableState(
    teams.data,
    matches.data,
    teams.isSuccess && matches.isSuccess
  );
  console.log(currentPage);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((old) => (old + 1) % 4);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const PageOne = () => {
    return (
      <div className="flex mx-2">
        <Table data={tableState.tableA} title="Gruppe A" size="lg" />
        <Table data={tableState.tableC} title="Gruppe C" size="lg" />
      </div>
    );
  };
  const PageTwo = () => {
    return (
      <div className="flex mx-2">
        <Table data={tableState.tableB} title="Gruppe B" size="lg" />
        <Table data={tableState.tableD} title="Gruppe D" size="lg" />
      </div>
    );
  };
  const PageThree = () => {
    return (
      <div className="text-4xl flex justify-center text-white">SEITE 3</div>
    );
  };
  const PageFour = () => {
    return (
      <div className="text-4xl flex justify-center text-white">SEITE 4</div>
    );
  };
  return (
    <div
      className="bg-slate-900 h-screen w-full flex items-center flex-col"
      onClick={() => {
        setCurrentPage((old) => (old + 1) % 4);
      }}
    >
      <div className="text-5xl text-white my-4 font-georgia tracking-widest">
        Standings
      </div>
      <div className="w-full">
        {currentPage === 0 && <PageOne />}
        {currentPage === 1 && <PageTwo />}
        {currentPage === 2 && <PageThree />}
        {currentPage === 3 && <PageFour />}
      </div>
    </div>
  );
}
export default Standings;
