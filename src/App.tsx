import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import AdminPage from "./pages/AdminPage";
import Standings from "./pages/Standings";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="standings" element={<Standings />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
