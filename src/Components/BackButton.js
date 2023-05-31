import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button className="back-button" onClick={goBack}>
      <span className="back-icon">&#8592;</span> Back
    </button>
  );
};

export default BackButton;