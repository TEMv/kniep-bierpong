import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import AdminPage from "./pages/AdminPage";
import Standings from "./pages/Standings";
import LandingPage from "./pages/LandingPage";
import Impressum from "./pages/Impressum";
import Login from "./pages/Login";
import type { User } from "./types";

function App() {
  const [user, setUser] = useState<User>();

  return (
    <div>
      <Routes>
        <Route index element={<LandingPage user={user} />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="standings" element={<Standings />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="impressum" element={<Impressum />} />
      </Routes>
    </div>
  );
}

export default App;
