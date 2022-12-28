import { Bierpong } from "../pages/index";
import { EventProps } from "../types";
function EventWrapper(props: EventProps) {
  if (props.type === "bierpong") {
    return <Bierpong {...props} />;
  } else {
    return <>kein bierpong</>;
  }
}
export default EventWrapper;
