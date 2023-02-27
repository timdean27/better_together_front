import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ParticipantPage = ({ isParticipant }) => {
  const navigate = useNavigate();
  console.log("isParticipant from ParticipantPage", isParticipant);
  const HomeBTN = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <button onClick={HomeBTN}>Home</button>
      ParticipantPage
    </div>
  );
};

export default ParticipantPage;
