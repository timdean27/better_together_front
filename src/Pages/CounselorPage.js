import React, { useEffect, useState } from "react";

const CounselorPage = ({ selectedRole }) => {
  const [role, setRole] = useState(selectedRole);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedRole", role);
  }, [role]);

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
    <div>
      <h1>Counselor Page</h1>
      <p>Selected Role: {selectedRole}</p>
      <div className="button-container">
        {commonGroupTherapyTitles.map((title, index) => (
          <button key={index}>{title}</button>
        ))}
      </div>
      {/* Rest of the Counseler Page content */}
    </div>
  );
};

export default CounselorPage;