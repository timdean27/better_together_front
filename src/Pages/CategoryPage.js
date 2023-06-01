import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { joinRoom } from "../firebaseServices/joinRoomServices"; // Import the joinRoom function

import "../css/CategoryPage.css"; // Import the CSS file

const CategoryPage = ({ selectedRole }) => {
  const { categoryName } = useParams();
  const [role, setRole] = useState(selectedRole);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
    initializeRooms();
  }, []);

  const initializeRooms = () => {
    const initialRooms = [
      { id: 1, patients: 0, counselors: 0 },
      { id: 2, patients: 0, counselors: 0 },
      { id: 3, patients: 0, counselors: 0 },
      { id: 4, patients: 0, counselors: 0 },
      { id: 5, patients: 0, counselors: 0 },
      { id: 6, patients: 0, counselors: 0 },
    ];
    setRooms(initialRooms);
  };

  const handleDotClick = (roomIndex, dotIndex) => {
    const updatedRooms = rooms.map((room, index) => {
      if (index === roomIndex) {
        if (role === "Patient" && room.patients < 7) {
          return {
            ...room,
            patients: room.patients + 1
          };
        } else if (role === "Counselor" && (dotIndex === 7 || dotIndex === 8) && room.counselors < 2) {
          return {
            ...room,
            counselors: room.counselors + 1
          };
        }
      }
      return room;
    });

    setRooms(updatedRooms);
    console.log("Current Rooms:", updatedRooms);
    console.log("Current Patients:", updatedRooms[roomIndex].patients);
    console.log("Current Counselors:", updatedRooms[roomIndex].counselors);
  };

  return (
    <div>
      <h1>Category Page</h1>
      <p>Selected Role: {role}</p>
      <p>Category Name: {categoryName}</p>
      <div className="room-container">
        {rooms.map((room, roomIndex) => (
          <div key={room.id} className="room">
            {[...Array(7)].map((_, patientIndex) => (
              <div
                key={`patient-${patientIndex}`}
                className={`dot ${
                  role === "Patient" && room.patients > patientIndex
                    ? "blue"
                    : ""
                }`}
                onClick={() => handleDotClick(roomIndex, patientIndex)}
              ></div>
            ))}
            {[...Array(2)].map((_, counselorIndex) => (
              <div
                key={`counselor-${counselorIndex}`}
                className={`dot ${
                  role === "Counselor" && room.counselors > counselorIndex && (counselorIndex === 0 || counselorIndex === 1)
                    ? "dark-red"
                    : ""
                }`}
                onClick={() => handleDotClick(roomIndex, counselorIndex + 7)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {/* Rest of the Category Page content */}
    </div>
  );
};

export default CategoryPage;

