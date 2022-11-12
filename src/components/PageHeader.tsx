import img from "../assets/index";
import "../styles/index.css";
import { Link } from "react-router-dom";
import type { User } from "../types/";

type PageHeaderProps = {
  user?: User;
  onLoginPage: boolean;
};
function PageHeader(props: PageHeaderProps) {
  return (
    <div className=" h-full w-full flex flex-col justify-center items-center">
      <div className="absolute top-8 right-16 text-3xl text-white font-georgia tracking-widest">
        <Link to={"/login"}>LOGIN</Link>
      </div>
      <div className="text-white text-5xl tracking-widest font-sans">
        <img src={img.Logos.logo_weiss} className=" h-64" alt="KNIEP_TITEL" />
      </div>
      {/*<div className="flex justify-between text-white font-sans tracking-wide">
        {props.user ? (
          <div>{props.user.username}</div>
        ) : (
          !props.onLoginPage && <Link to={"/login"}>Login</Link>
        )}
      </div>*/}
      <div className="h-20"></div>
      <div className="flex justify-evenly w-1/3 text-white text-5xl font-georgia tracking-widest">
        <Link to={"/galerie"}>GALERIE</Link>
        <Link to={"/events"}>EVENTS</Link>
      </div>
      <div className="h-10"></div>
      <div className="flex justify-evenly w-1/3 text-white text-5xl font-georgia tracking-widest">
        <Link to={"/feedback"}>FEEDBACK</Link>
      </div>
      <div className=" h-36"></div>
    </div>
  );
}
export default PageHeader;
