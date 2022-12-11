import type { User } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/index";
function ProfilePage(props: { user: User }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.user.username) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gray-600 w-full h-screen">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>

      <div className="flex flex-col h-screen text-3xl text-white justify-center items-center">
        Benutzername: {props.user.username}
        <br />
        Vorname: {props.user.firstname} <br />
        Nachname: {props.user.lastname} <br />
        Zuletzt eingeloggt: {new Date(props.user.last_login).toLocaleString()}
        <br />
        Rolle: {props.user.role}
      </div>
    </div>
  );
}
export default ProfilePage;
