import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CategoryPage.css"; // Import the CSS file
import { joinRoom, getSignedUpRooms } from "../firebaseServices/joinRoomServices";

const CategoryPage = ({ selectedRole }) => {
  const { categoryName } = useParams();
  const [role, setRole] = useState(selectedRole);
  const [rooms, setRooms] = useState([]);
  const [signedUpRooms, setSignedUpRooms] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
    initializeRooms();
    fetchSignedUpRooms();
  }, []);

  // Initialize the rooms state with default values
  const initializeRooms = () => {
    const initialRooms = [
      { id: 1, patients: 0, counselors: [] },
      { id: 2, patients: 0, counselors: [] },
      { id: 3, patients: 0, counselors: [] },
      { id: 4, patients: 0, counselors: [] },
      { id: 5, patients: 0, counselors: [] },
      { id: 6, patients: 0, counselors: [] },
    ];

    setRooms(initialRooms);
  };

  // Fetch the signed up rooms for the user's role and category from Firestore
  const fetchSignedUpRooms = async () => {
    try {
      const signedUpRoomsData = await getSignedUpRooms(role, categoryName);
      setSignedUpRooms(signedUpRoomsData);
      console.log("Signed Up Rooms:", signedUpRoomsData);
    } catch (error) {
      console.error("Error fetching signed up rooms:", error);
    }
  };

  // Handle the click event of a dot
  const handleDotClick = async (roomIndex, dotIndex) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[roomIndex];

    if (signedUpRooms.includes(roomIndex)) {
      console.log("User has already signed up for a room in this category");
      return;
    }

    if (role === "Patient") {
      if (room.patients < 6) {
        room.patients += 1;
      }
    } else if (role === "Counselor") {
      if (dotIndex === 7 || dotIndex === 8 || dotIndex === 9) {
        if (room.counselors.length < 3) {
          room.counselors.push(dotIndex);
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
            {[...Array(6)].map((_, patientIndex) => (
              <div
                key={`patient-${patientIndex}`}
                id={`dot-${roomIndex}-${patientIndex}`}
                className={`dot ${
                  role === "Patient" && room.patients > patientIndex ? "blue" : ""
                }`}
                onClick={() => handleDotClick(roomIndex, patientIndex, categoryName)}
              ></div>
            ))}
            {[...Array(3)].map((_, counselorIndex) => (
              <div
                key={`counselor-${counselorIndex}`}
                id={`dot-${roomIndex}-${counselorIndex + 7}`}
                className={`dot ${
                  role === "Counselor" && room.counselors.includes(counselorIndex + 7)
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



