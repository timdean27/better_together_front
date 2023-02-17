import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import Home from "./Pages/Home";
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import { AuthContext } from "./Components/Authentication/Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser in app page" ,currentUser);

  const RequireAuth = () => {
    return currentUser ? <Outlet/> : <Navigate to="/FireBaseLogin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
          <Route path="FireBaseLogin" element={<FireBaseLogin currentUser={currentUser}/>} />
          <Route
            element={
              <RequireAuth/>
            }>
            <Route element={<Home/>} path="/" exact></Route>
            </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
