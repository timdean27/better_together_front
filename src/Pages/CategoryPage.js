import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CategoryPage.css"; // Import the CSS file
import { joinRoom } from "../firebaseServices/joinRoomServices";

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

  const handleDotClick = async (roomIndex, dotIndex) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[roomIndex];

    if (role === "Patient") {
      if (room.patients < 7) {
        room.patients += 1;
      }
    } else if (role === "Counselor") {
      if (dotIndex === 7 || dotIndex === 8) { // Only allow dots 8 and 9 to turn red
        if (room.counselors < 2) {
          room.counselors += 1;
          const dotElement = document.getElementById(`dot-${roomIndex}-${dotIndex}`);
          dotElement.classList.add("dark-red");
        }
      }
    }

    setRooms(updatedRooms);
    console.log("Current Rooms:", updatedRooms);
    console.log("Current Patients:", updatedRooms[roomIndex].patients);
    console.log("Current Counselors:", updatedRooms[roomIndex].counselors);

    const roomJoinData = {
      userRole: role,
      categoryName: categoryName,
      timestamp: new Date().getTime(),
      roomIndex: roomIndex,
    };

    try {
        await joinRoom(roomIndex, role, new Date().getTime(), categoryName);
      console.log("Room join data saved to Firestore:", roomJoinData);
    } catch (error) {
      console.error("Error joining room:", error);
    }
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
                id={`dot-${roomIndex}-${patientIndex}`}
                className={`dot ${
                  role === "Patient" && room.patients > patientIndex
                    ? "blue"
                    : ""
                }`}
                onClick={() => handleDotClick(roomIndex, patientIndex, categoryName)}
              ></div>
            ))}
            {[...Array(2)].map((_, counselorIndex) => (
              <div
                key={`counselor-${counselorIndex}`}
                id={`dot-${roomIndex}-${counselorIndex + 7}`}
                className={`dot ${
                  role === "Counselor" && room.counselors > counselorIndex
                    ? "dark-red"
                    : ""
                }`}
                onClick={() => handleDotClick(roomIndex, counselorIndex + 7, categoryName)}
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

