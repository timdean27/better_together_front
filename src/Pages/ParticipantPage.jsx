import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc , setDoc } from "firebase/firestore"
import { firebaseDB } from "../firebase";
const ParticipantPage = ({ isParticipant }) => {
  const navigate = useNavigate();
  console.log("isParticipant from ParticipantPage", isParticipant);
  const HomeBTN = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleAdd = async(e) => {
    e.preventDefault();
    await setDoc(doc(firebaseDB,"cities"))
  }
  return (
    <div>
      <button onClick={HomeBTN}>Home</button>
      ParticipantPage
      <div>
        <form onSubmit={handleAdd}>

        </form>
      </div>
    </div>
  );
};

export default ParticipantPage;
