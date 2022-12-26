import { TableRow } from "../types";
function Table(props: { data: Array<TableRow>; title: string }) {
  return (
    <div className={`overflow-x-auto relative `}>
      <span className="text-white text-center flex justify-center text-xl">
        {props.title}
      </span>
      <table className=" mx-2  text-sm text-left  text-gray-400">
        <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="py-2 px-2">
              Platz
            </th>
            <th scope="col" className="py-2 px-2">
              Team
            </th>
            <th scope="col" className="py-2 px-4">
              W/L
            </th>
            <th scope="col" className="py-2 px-2">
              Differenz
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, index) => (
            <tr
              key={index}
              className={`bg-gray-800 border-b border-gray-700 ${
                row.wins === 3 && !row.out_in_ko
                  ? "text-emerald-700"
                  : row.losses === 3 || row.out_in_ko
                  ? "text-red-500"
                  : "text-white"
              } `}
            >
              <th
                scope="row"
                className={`px-2 font-medium whitespace-nowrap text-center `}
              >
                {index + 1}
              </th>
              <td className=" px-2 truncate max-w-[150px]">{row.teamname}</td>
              <td className=" px-2 text-center">{`${row.wins} :  ${row.losses}`}</td>
              <td className=" px-2 text-center">{row.cup_diff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
