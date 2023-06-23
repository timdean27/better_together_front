import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CategoryPage.css"; // Import the CSS file
import {
  joinRoom,
  getSignedUpRooms,
  createClientRoomCollection,
  getClientRoomCollection,
  getGroupClientsParticipates,
} from "../firebaseServices/joinRoomServices";

const CategoryPage = ({ selectedRole }) => {
  const { categoryName } = useParams();
  const [role, setRole] = useState(selectedRole);
  const [rooms, setRooms] = useState([]);
  const [signedUpRooms, setSignedUpRooms] = useState([]);
  const [clientRoomCollection, setClientRoomCollection] = useState(null);
  const [groupClientsParticipates, setGroupClientsParticipates] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setRole(storedRole);
    }
    initializeRooms();
    fetchSignedUpRooms();
    initializeClientRoomCollection();
    fetchGroupClientsParticipates();
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
      const signedUpRoomsData = await getSignedUpRooms(categoryName);
      setSignedUpRooms(signedUpRoomsData);
      console.log("Signed Up Rooms:", signedUpRoomsData);

      // Automatically fill the dot if the user is already signed up for a room in the loaded category
      if (signedUpRoomsData.length > 0) {
        const updatedRooms = [...rooms];
        signedUpRoomsData.forEach((roomIndex) => {
          const room = updatedRooms[roomIndex];
          if (role === "Patient") {
            room.patients += 1;
          } else if (role === "Counselor") {
            room.counselors.push(7, 8, 9);
          }
        });
        setRooms(updatedRooms);
      }
    } catch (error) {
      console.error("Error fetching signed up rooms:", error);
    }
  };

  // Initialize or fetch the client's room collection for the current category
  const initializeClientRoomCollection = async () => {
    try {
      const collectionRef = await getClientRoomCollection(categoryName);
      if (collectionRef) {
        setClientRoomCollection(collectionRef);
      } else {
        await createClientRoomCollection(categoryName);
      }
    } catch (error) {
      console.error("Error initializing client room collection:", error);
    }
  };

  // Fetch the group's clients participates for the current category
  const fetchGroupClientsParticipates = async () => {
    try {
      const groupClientsParticipatesData = await getGroupClientsParticipates(categoryName);
      setGroupClientsParticipates(groupClientsParticipatesData);
      console.log("Group Clients Participates:", groupClientsParticipatesData);
    } catch (error) {
      console.error("Error fetching group clients participates:", error);
    }
  };

  // Handle the click event of a dot
  const handleDotClick = async (roomIndex, dotIndex) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[roomIndex];

    if (signedUpRooms.length > 0) {
      console.log("User has already signed up for a room in this category");
      return;
    }

    if (role === "Patient") {
      if (dotIndex >= 0 && dotIndex < 6) {
        // Only patients can click dots 0-5
        if (room.patients < 6) {
          room.patients += 1;
          room.counselors = room.counselors.filter((counselorIndex) => counselorIndex < 7);
          room.counselors.push(7, 8, 9); // Reset counselors to initial state
          room.selectedDot = dotIndex; // Store the selected dotIndex for color change
        }
      }
    } else if (role === "Counselor") {
      if (dotIndex >= 7 && dotIndex <= 9) {
        // Only counselors can click dots 7-9
        if (room.counselors.length < 3) {
          room.counselors.push(dotIndex);
          room.patients = 0; // Reset patients to initial state
          room.selectedDot = dotIndex; // Store the selected dotIndex for color change
        }
      }
    }

    setRooms([...rooms]);
    console.log("Current Rooms:", updatedRooms);
    console.log("Current Patients:", updatedRooms[roomIndex].patients);
    console.log("Current Counselors:", updatedRooms[roomIndex].counselors);

    const roomJoinData = {
      userRole: role,
      categoryName: categoryName,
      timestamp: new Date().getTime(),
      roomIndex: roomIndex,
      seat: dotIndex,
    };

    try {
      if (signedUpRooms.length === 0) {
        await joinRoom(roomIndex, role, new Date().getTime(), categoryName, roomJoinData);
        console.log("Room join data saved to Firestore:", roomJoinData);

        // Add categoryName to groupsClientParticipates
        const updatedSignedUpRooms = [...signedUpRooms, roomIndex];
        setSignedUpRooms(updatedSignedUpRooms);
        console.log("Updated Signed Up Rooms:", updatedSignedUpRooms);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  // Check if a dot should be filled based on groupClientsParticipates
  const isDotFilled = (roomIndex, dotIndex) => {
    const groupClientParticipates = groupClientsParticipates.find(
      (participate) => participate.roomIndex === roomIndex && participate.seat === dotIndex
      
    );
    console.log("Check Room index that is filled", roomIndex);
    return groupClientParticipates ? true : false;
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
                } ${isDotFilled(roomIndex, patientIndex) ? "filled" : ""}`}
                onClick={() => handleDotClick(roomIndex, patientIndex)}
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
                } ${isDotFilled(roomIndex, counselorIndex + 7) ? "filled" : ""}`}
                onClick={() => handleDotClick(roomIndex, counselorIndex + 7)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;







