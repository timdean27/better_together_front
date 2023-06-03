import { setDoc, collection, doc, query, where, getDocs } from "firebase/firestore";
import { firebaseDB } from "../firebase";
import { auth } from "../firebase";

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

    const signedUpRooms = await getSignedUpRooms(role, categoryName);
    if (signedUpRooms.includes(roomIndex)) {
      throw new Error("User already joined a room for this category");
    }

    const hasRoomForCategory = await checkUserHasRoomForCategory(uid, categoryName);
    if (hasRoomForCategory) {
      throw new Error("User already has a room for this category");
    }

    const joinedRoom = {
      roomIndex: roomIndex,
      userRole: role,
      categoryName: categoryName,
      timestamp: timestamp,
      uid: uid,
    };

    const clientsCurrentRoomsCollection = collection(
      firebaseDB,
      "clientsCurrentRooms"
    );
    const newDocRef = doc(clientsCurrentRoomsCollection, uid);

    await setDoc(newDocRef, joinedRoom);

    console.log("Joined room stored in Firestore under user's UID");
  } catch (error) {
    console.error("Error storing joined room in Firestore:", error);
    throw error;
  }
};

export const getSignedUpRooms = async (role, categoryName) => {
  try {
    const q = query(
      collection(firebaseDB, "clientsCurrentRooms"),
      where("userRole", "==", role),
      where("categoryName", "==", categoryName)
    );
    const querySnapshot = await getDocs(q);

    const signedUpRooms = [];
    querySnapshot.forEach((doc) => {
      signedUpRooms.push(doc.data().roomIndex);
    });

    return signedUpRooms;
  } catch (error) {
    throw new Error("Error fetching signed up rooms: " + error.message);
  }
};

export const getUserSignedUpRooms = async (uid, categoryName) => {
  try {
    const signedUpRooms = await getSignedUpRooms(uid, categoryName);
    // Here you can update your user interface to reflect the signed up rooms
    // For example, set a state variable indicating the signed up rooms for the user
    console.log("Signed up rooms for category", categoryName, ":", signedUpRooms);
  } catch (error) {
    console.error("Error fetching user's signed up rooms:", error);
  }
};

export const checkUserHasRoomForCategory = async (uid, categoryName) => {
  try {
    const q = query(
      collection(firebaseDB, "clientsCurrentRooms"),
      where("uid", "==", uid),
      where("categoryName", "==", categoryName)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking user's room for category:", error);
    return false;
  }
};

