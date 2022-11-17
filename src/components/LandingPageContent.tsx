import img from "../assets/index";
import "../styles/index.css";
import { Link } from "react-router-dom";
import type { User } from "../types";

type PageHeaderProps = {
  user?: User;
};
function PageHeader(props: PageHeaderProps) {
  return (
    <div className=" h-full w-full flex flex-col sm:justify-center items-center">
      <div className="absolute sm:top-8 sm:right-16 top-8 right-8 text-lg sm:text-3xl text-white font-georgia tracking-widest">
        <Link to={"/login"}>LOGIN</Link>
      </div>
      <div className="h-28 sm:h-0" />
      <img
        src={img.Logos.logo_weiss}
        className="h-32 sm:h-64"
        alt="KNIEP_TITEL"
      />
      <div className="sm:h-20 h-20"></div>
      <div className="flex sm:flex-row flex-col sm:h-auto h-20 justify-between sm:justify-evenly items-center w-full sm:w-1/2 text-white text-3xl sm:text-5xl font-georgia tracking-widest">
        <Link to={"/galerie"}>GALERIE</Link>
        <Link to={"/events"}>EVENTS</Link>
      </div>
      <div className="sm:h-10 h-2"></div>
      <div className="flex justify-center sm:justify-center w-full sm:w-1/2 text-white text-3xl sm:text-5xl font-georgia tracking-widest">
        <Link to={"/feedback"}>FEEDBACK</Link>
      </div>
      <div className=" h-36"></div>
    </div>
  );
}
export default PageHeader;
