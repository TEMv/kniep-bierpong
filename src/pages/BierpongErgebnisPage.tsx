import { EventProps } from "../types";
import { useTeams, useMatches } from "../hooks/queries";
import { useTableState } from "../hooks/tableState";
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

  return (
    <div className="h-screen justify-between flex bg-slate-900">
      <div className="flex flex-col justify-between py-4">
        <Table data={tableState.tableA} title="Gruppe A" />
        <Table data={tableState.tableB} title="Gruppe B" />
      </div>
      <div className="grow">
        <MatchEditor matches={matches.data} />
      </div>
      <div className="flex flex-col justify-between py-4">
        <Table data={tableState.tableC} title="Gruppe C" />
        <Table data={tableState.tableD} title="Gruppe D" />
      </div>
    </div>
  );
}
export default BierpongErgebnisPage;
