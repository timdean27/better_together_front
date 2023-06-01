import { setDoc, collection, doc } from "firebase/firestore";
import { firebaseDB, auth } from "../firebase";

export const joinRoom = async (roomIndex, role, timestamp, categoryName) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const uid = user.uid;
    console.log("UID:", uid);
    console.log("Room Index:", roomIndex);
    console.log("Role:", role);
    console.log("Category Name:", categoryName);

    const joinedRoom = {
      roomIndex: roomIndex,
      userRole: role,
      categoryName: categoryName,
      timestamp: timestamp,
    };

    const clientsCurrentRoomsCollection = collection(
      firebaseDB,
      "clientsCurrentRooms" // Provide the correct collection name here
    );
    const newDocRef = doc(clientsCurrentRoomsCollection, uid);

    await setDoc(newDocRef, joinedRoom);

    console.log("Joined room stored in Firestore under user's UID");
  } catch (error) {
    console.error("Error storing joined room in Firestore:", error);
    throw error;
  }
};

