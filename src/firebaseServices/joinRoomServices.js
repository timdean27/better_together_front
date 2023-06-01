import { setDoc, collection, doc } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebase";

export const joinRoom = async (roomIndex, role, categoryName) => {
  try {
    const joinedRoom = {
      roomIndex: roomIndex,
      role: role,
      categoryName: categoryName,
    };

    const joinedRoomsCollection = collection(firebaseDB, "JoinedRooms");
    await setDoc(doc(joinedRoomsCollection), joinedRoom);

    console.log("Joined room stored in Firestore");
  } catch (error) {
    console.error("Error storing joined room in Firestore:", error);
    throw error;
  }
};