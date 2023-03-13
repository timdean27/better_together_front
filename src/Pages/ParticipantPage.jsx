import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc , setDoc } from "firebase/firestore"
import { firebaseDB } from "../firebase";
import GroupParticipant from "../Components/Authentication/UsersGroups.jsx/GroupParticipant";
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
          <button>Add Document</button>
        </form>
        <button type="submit">submit</button>
      </div>
      <div>
        <GroupParticipant/>
      </div>
    </div>
  );
};

export default ParticipantPage;
