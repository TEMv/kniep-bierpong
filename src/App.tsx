import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import ProfilePage from "./pages/ProfilePage";
import Standings from "./pages/Standings";
import LandingPage from "./pages/LandingPage";
import Impressum from "./pages/Impressum";
import Login from "./pages/Login";
import type { User } from "./types";
import { emptyUser } from "./constants/user";
function App() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isEmpty =
    storedUser &&
    Object.keys(storedUser).length === 0 &&
    Object.getPrototypeOf(storedUser) === Object.prototype;

  const [user, setUser] = useState<User>(isEmpty ? emptyUser : storedUser);

  return (
    <div className=" min-w-[300px]">
      <Routes>
        <Route index element={<LandingPage user={user} setUser={setUser} />} />
        <Route path="profile" element={<ProfilePage user={user} />} />
        <Route path="standings" element={<Standings />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="impressum" element={<Impressum />} />
      </Routes>
    </div>
  );
}

export default App;
