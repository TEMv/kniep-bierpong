import { useNavigate } from "react-router-dom";
import img from "../assets/index";
import { EventProps } from "../types";
import { useTeams } from "../hooks/queries";
function BierpongErgebnisPage(props: EventProps) {
  const teams = useTeams(props.eventid, true);
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-slate-900">
      Moin
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
    </div>
  );
}
export default BierpongErgebnisPage;
