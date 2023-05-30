import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Components/Authentication/Context/AuthContext";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import Home from "./Pages/Home";
import CounselorPage from "./Pages/CounselorPage";
import PatientPage from "./Pages/PatientPage";

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/FireBaseLogin" />;
};

function App() {
  const { currentUser } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/FireBaseLogin" element={<FireBaseLogin />} />
        <Route path="/create-user" element={<FireBaseCreateUser />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home
                currentUser={currentUser}
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/counselor"
          element={
            <RequireAuth>
              <CounselorPage selectedRole={selectedRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/patient"
          element={
            <RequireAuth>
              <PatientPage selectedRole={selectedRole} />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;