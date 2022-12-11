import { EventProps } from "../types";
import img from "../assets/index";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function EventCard(props: EventProps) {
  const navigate = useNavigate();
  return (
    <div
      className=" bg-gray-500 cursor-pointer hover:drop-shadow-xl h-36 text-white rounded-lg p-2 my-2 mx-2 drop-shadow-lg shadow-black flex"
      onClick={() => navigate(props.type + "/" + props.eventid)}
    >
      <div>
        <img className="h-32 w-32" src={img.Logos.logo} alt="kniep-logo" />
      </div>
      <div className="w-8"></div>
      <div className=" grow  flex flex-col justify-evenly">
        <div className="w-full  text-white text-4xl ">{props.name}</div>
        <div className="text-lg">{props.description}</div>
        <div className="w-full flex">
          <div className="flex items-center text-sm">
            {img.Icons.clock("w-5 h-5")}
            <span className="w-3" />
            {dayjs(props.start).format("DD.MM.YYYY HH:mm")}
          </div>
          <span className="w-6" />
          <div className="flex items-center text-sm">
            {img.Icons.house("w-5 h-5")}
            <span className="w-3" />
            {props.location}
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventCard;
