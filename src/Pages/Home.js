import React, { useState, useContext, useEffect } from "react";
import FireBaseLogin from "../Components/Authentication/FireBaseLogin";

import { useNavigate } from "react-router-dom";

const Home = ({ currentUser, setIsParticipant, setIsCounselor }) => {
  const navigate = useNavigate();

  const SelectTitle = (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "Participant":
        setIsParticipant(true);
        navigate("/Participant");
        break;
      case "Counselor":
        setIsCounselor(true);
        navigate("/Counselor");
        break;
      default:
      // do nothing
    }
  };

  return (
    <div>
      <FireBaseLogin currentUser={currentUser} />
      <div>
        This App is to create a safe environment to get help from a group of
        people going through the same issues. Groups are created with 6 people
        currently seeking help with an issue, 3 advisors that have dealt with
        and handled the same issue and are able to give personal advice, and a
        professional therapists to help and moderate.
        <div>
          <div>
            Select if you are signing up as a Consoler or a Participant
            <button value="Participant" onClick={SelectTitle}>
              Participant
            </button>
            <button value="Counselor" onClick={SelectTitle}>
              Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
