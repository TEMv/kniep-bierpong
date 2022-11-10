import logo from "../assets/KNIEP_Logo_sRGB.png";
import "../styles/index.css";
import { Link } from "react-router-dom";
import type { User } from "../types/index";
type PageHeaderProps = {
  user?: User;
  onLoginPage: boolean;
};
function PageHeader(props: PageHeaderProps) {
  return (
    <div className="absolute top-0 h-20 bg-slate-700 w-full">
      <div className="flex flex-row justify-around items-center">
        <div>
          <img src={logo} className="h-20" alt="KNIEP_LOGO" />
        </div>
        <div className="text-white text-4xl tracking-wider font-sans">
          KNIEP BIERPONG
        </div>
        <div className="flex justify-between w-40 text-white font-sans tracking-wide">
          {props.user ? (
            <div>{props.user.username}</div>
          ) : (
            !props.onLoginPage && <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default PageHeader;
