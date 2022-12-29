import { TableRow } from "../types";
function Table(props: { data: Array<TableRow>; title: string; size: string }) {
  return (
    <div
      className={`overflow-x-auto w-full p-2 relative  ${
        props.size === "lg" && "lg:w-1/2 w-full"
      }`}
    >
      <span
        className={`text-white text-center flex justify-center ${
          props.size === "lg" ? "text-4xl pb-2" : "text-xl"
        }`}
      >
        {props.title}
      </span>
      <table
        className={`text-left w-full text-gray-400 ${
          props.size === "lg" ? "text-2xl" : "text-sm"
        }`}
      >
        <thead className={`  uppercase  bg-gray-700 text-gray-400 `}>
          <tr>
            <th scope="col" className="py-2 px-2 w-1/12">
              Platz
            </th>
            <th scope="col" className="py-2 px-2 w-7/12">
              Team
            </th>
            <th scope="col" className="py-2 px-4 w-3/12">
              W/L
            </th>
            <th scope="col" className="py-2 px-2 w-1/12">
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
              } ${props.size === "lg" && "py-8"}`}
            >
              <th
                scope="row"
                className={`px-2 font-medium whitespace-nowrap text-center ${
                  props.size === "lg" && "w-1/12"
                }`}
              >
                {index + 1}
              </th>
              <td
                className={` px-2 truncate ${
                  props.size === "sm" && "max-w-[150px]"
                } ${props.size === "lg" && "py-1  w-6/12"}`}
              >
                {row.teamname}
              </td>
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
