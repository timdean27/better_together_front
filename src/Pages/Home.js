import React, { useState, useContext, useEffect } from "react";
import FireBaseLogin from "../Components/Authentication/FireBaseLogin";

import { useNavigate } from "react-router-dom";

const Home = ({ currentUser, logout}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser && <button onClick={logout}>Log Out</button>}
    </div>
      <div>
        This App is to create a safe environment to get help from a group of
        people going through the same issues. Groups are created with 6 people
        currently seeking help with an issue, 3 advisors that have dealt with
        and handled the same issue and are able to give personal advice, and a
        professional therapists to help and moderate
      </div>
    </div>
  );
};

export default Home;
