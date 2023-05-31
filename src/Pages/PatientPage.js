import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PatientPage.css";

const PatientPage = ({ selectedRole }) => {
  const [role, setRole] = useState(selectedRole);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const commonGroupTherapyTitles = [
    "Anxiety Support Group",
    "Depression Recovery Group",
    "Substance Abuse Anonymous",
    "Grief and Loss Counseling",
    "Anger Management Workshop",
    "Eating Disorder Support Group",
    "Parenting Skills Group",
    "Trauma Healing Circle",
    "Self-Esteem Building Group",
    "Stress Management Workshop",
  ];

  return (
    <div className="patient-page">
      <h1>Patient Page</h1>
      <p>Selected Role: {role}</p>
      <div className="button-container">
        {commonGroupTherapyTitles.map((title, index) => (
          <Link key={index} to={`/category/${encodeURIComponent(title)}`}>
            <button className="bubble-button">{title}</button>
          </Link>
        ))}
      </div>
      {/* Rest of the Patient Page content */}
    </div>
  );
};

export default PatientPage;