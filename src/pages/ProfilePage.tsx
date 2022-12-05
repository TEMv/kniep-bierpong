import type { User } from "../types";
import { useNavigate } from "react-router-dom";
function ProfilePage(props: { user: User }) {
  const navigate = useNavigate();
  console.log(props.user);
  return (
    <div className="bg-gray-600 w-full h-screen">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </div>
      {props.user ? (
        <div className="flex flex-col h-screen text-3xl text-white justify-center items-center">
          Benutzername: {props.user.username}
          <br />
          Vorname: {props.user.firstname} <br />
          Nachname: {props.user.lastname} <br />
          Zuletzt eingeloggt: {new Date(props.user.last_login).toLocaleString()}
          <br />
          Rolle: {props.user.role}
        </div>
      ) : (
        <div>Nicht eingeloggt!</div>
      )}
    </div>
  );
}
export default ProfilePage;
