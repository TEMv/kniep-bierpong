import { useEvents } from "../hooks/queries";
import EventCard from "../components/EventCard";
import { EventProps } from "../types";
import img from "../assets/index";
import { useNavigate } from "react-router-dom";
import PageFooter from "../components/PageFooter";

function Events() {
  const eventQuery = useEvents();
  const navigate = useNavigate();
  console.log(eventQuery.data);

  return (
    <div className="bg-gray-600 h-screen items-center justify-center flex-col flex">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
      <div className="text-5xl my-8 flex text-white justify-center font-georgia tracking-widest">
        EVENTS
      </div>
      <div className="w-2/3 pt-4 rounded-lg bg-gray-500 h-full">
        {eventQuery.isSuccess &&
          eventQuery.data.map((event: EventProps) => (
            <EventCard {...event} key={event.eventid} />
          ))}
      </div>
      <PageFooter />
    </div>
  );
}
export default Events;
