import img from "../assets/index";
import "../styles/index.css";
import { Link } from "react-router-dom";
import type { User } from "../types/";

type PageHeaderProps = {
  user?: User;
  onLoginPage: boolean;
};
function PageHeader(props: PageHeaderProps) {
  console.log(img.images);
  return (
    <div className=" h-20 bg-gray-800 w-full">
      <div className="flex flex-row justify-around items-center">
        <div>
          <img src={img.logo} className="h-20" alt="KNIEP_LOGO" />
        </div>
        <div className="text-white text-5xl tracking-widest font-sans">
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
