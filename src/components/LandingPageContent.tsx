import img from "../assets/index";
import "../styles/index.css";
import { Link } from "react-router-dom";
import type { User } from "../types";
import { useState } from "react";
import { emptyUser } from "../constants";
type PageHeaderProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};
function PageHeader(props: PageHeaderProps) {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.setUser(emptyUser);
    setProfileOpen(false);
  };
  return (
    <div className=" h-full w-full flex flex-col md:justify-center items-center">
      <div
        className={
          "absolute top-8 text-lg md:text-3xl text-white font-georgia tracking-widest " +
          (profileOpen ? "md:right-1 " : "md:right-12 ")
        }
      >
        {props.user.uid !== 0 ? (
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-14 h-14 text-4xl bg-gray-500 flex bg-opacity-50 items-center justify-center tracking-normal cursor-pointer"
              onClick={() => setProfileOpen((old) => !old)}
            >
              {props.user.firstname[0]}
            </div>
            {profileOpen && (
              <div className="relative w-36 h-20 md:h-40 flex flex-col items-center text-2xl ">
                <div className="w-0 h-0 border-l-transparent border-l-8 border-r-8 border-r-transparent border-b-white border-opacity-25 border-b-8 " />
                <div className="flex flex-col w-full justify-evenly items-center h-full bg-gray-500 bg-opacity-50 rounded-lg">
                  <Link to={"/profile"}>PROFIL</Link>
                  {props.user.role === "admin" && (
                    <Link to={"/admin"}>ADMIN</Link>
                  )}
                  <div className="cursor-pointer" onClick={() => logout()}>
                    LOGOUT
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"}>LOGIN</Link>
        )}
      </div>
      <div className="h-48 md:h-0" />
      <img
        src={img.Logos.logo_weiss}
        className="h-32 md:h-64"
        alt="KNIEP_TITEL"
      />
      <div className="md:h-20 h-20"></div>
      <div className="flex md:flex-row flex-col md:h-auto h-20 justify-between md:justify-evenly items-center w-full md:w-1/2 text-white text-3xl md:text-5xl font-georgia tracking-widest">
        <Link to={"/galerie"}>GALERIE</Link>
        <Link to={"/events"}>EVENTS</Link>
      </div>
      <div className="md:h-10 h-2"></div>
      <div className="flex justify-center md:justify-center w-full md:w-1/2 text-white text-3xl md:text-5xl font-georgia tracking-widest">
        <Link to={"/feedback"}>FEEDBACK</Link>
      </div>
      <div className=" h-36"></div>
    </div>
  );
}
export default PageHeader;
