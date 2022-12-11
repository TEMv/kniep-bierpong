import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import {
  Events,
  ProfilePage,
  Standings,
  LandingPage,
  Impressum,
  Login,
  EventWrapper,
  AdminPage,
} from "./pages/index";
import type { User, EventProps } from "./types";
import { emptyUser } from "./constants";
import { useEvents } from "./hooks/queries";
function App() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isEmpty =
    storedUser &&
    Object.keys(storedUser).length === 0 &&
    Object.getPrototypeOf(storedUser) === Object.prototype;

  const [user, setUser] = useState<User>(isEmpty ? emptyUser : storedUser);
  const events = useEvents();

  return (
    <div className=" min-w-[300px]">
      <Routes>
        <Route index element={<LandingPage user={user} setUser={setUser} />} />
        <Route path="profile" element={<ProfilePage user={user} />} />
        <Route path="admin" element={<AdminPage user={user} />} />
        <Route path="events">
          <Route index element={<Events />} />
          {events.isSuccess &&
            events.data.map((evt: EventProps) => {
              return (
                <Route path={evt.type} key={evt.type}>
                  <Route path={evt.eventid.toString()}>
                    <Route
                      index
                      element={<EventWrapper {...evt} key={evt.eventid} />}
                    />
                    <Route
                      path="standings"
                      element={
                        <Standings {...evt} key={evt.eventid + "standings"} />
                      }
                    />
                  </Route>
                </Route>
              );
            })}
        </Route>
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="impressum" element={<Impressum />} />
      </Routes>
    </div>
  );
}

export default App;
