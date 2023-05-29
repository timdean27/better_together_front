import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Components/Authentication/Context/AuthContext";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import Home from "./Pages/Home";

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/FireBaseLogin" />;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="FireBaseLogin" element={<FireBaseLogin />} />
          <Route path="create-user" element={<FireBaseCreateUser />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home currentUser={currentUser} />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;