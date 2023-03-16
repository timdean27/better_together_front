import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupCounselor from "../Components/Authentication/UsersGroups.jsx/GroupCounselor";

const CounselorPage = ({ isCounselor ,currentUser}) => {
  const navigate = useNavigate();
  console.log("isCounselor from CounselorPage", isCounselor);
  const HomeBTN = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <button onClick={HomeBTN}>Home</button>
      CounselorPage
      <div>
        <GroupCounselor currentUser={currentUser}/>
      </div>
    </div>
  );
};

export default CounselorPage;
