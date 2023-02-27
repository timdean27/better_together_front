import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import Home from "./Pages/Home";
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import { AuthContext } from "./Components/Authentication/Context/AuthContext";

import ParticipantPage from "./Pages/ParticipantPage";
import CounselorPage from "./Pages/CounselorPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [isParticipant, setIsParticipant] = useState(null);
  const [isCounselor, setIsCounselor] = useState(null);
  console.log("currentUser in app page", currentUser);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/FireBaseLogin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="FireBaseLogin"
            element={<FireBaseLogin currentUser={currentUser} />}
          />
          <Route
            index
            element={
              <RequireAuth>
                <Home
                  currentUser={currentUser}
                  setIsParticipant={setIsParticipant}
                  setIsCounselor={setIsCounselor}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/Participant"
            element={
              <RequireAuth>
                <ParticipantPage
                  currentUser={currentUser}
                  isParticipant={isParticipant}
                />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/Counselor"
          element={
            <RequireAuth>
              <CounselorPage
                currentUser={currentUser}
                isCounselor={isCounselor}
              />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
