import { EventProps } from "../types";
import { useTeams, useMatches } from "../hooks/queries";
import { useTableState } from "../hooks/tableState";
import { useNextGames } from "../hooks/nextGames";
import Table from "../components/Table";
import MatchEditor from "../components/admin/MatchEditor";
function BierpongErgebnisPage(props: EventProps) {
  const teams = useTeams(props.eventid, true);
  const matches = useMatches(props.eventid);
  const tableState = useTableState(
    teams.data,
    matches.data,
    teams.isSuccess && matches.isSuccess
  );
  useNextGames(
    teams.data,
    matches.data,
    tableState,
    props.eventid,
    teams.isSuccess && matches.isSuccess && tableState.tableA.length > 0
  );
  return (
    <div className="h-screen justify-between flex bg-slate-900">
      <div className="flex flex-col justify-between py-4">
        <Table data={tableState.tableA} title="Gruppe A" />
        <Table data={tableState.tableC} title="Gruppe C" />
      </div>
      <div className="grow">
        <MatchEditor
          matches={matches.data}
          bpid={props.eventid}
          teams={teams.data}
        />
      </div>
      <div className="flex flex-col justify-between py-4">
        <Table data={tableState.tableB} title="Gruppe B" />
        <Table data={tableState.tableD} title="Gruppe D" />
      </div>
    </div>
  );
}
export default BierpongErgebnisPage;
