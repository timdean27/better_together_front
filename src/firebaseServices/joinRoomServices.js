import { setDoc, collection, doc, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase";
import { auth } from "../firebase";

export const joinRoom = async (roomIndex, role, timestamp, categoryName , dotIndex) => {
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
    console.log("dotIndex = seat", dotIndex.seat)
    const signedUpRooms = await getSignedUpRooms(uid, categoryName);
    if (signedUpRooms.includes(roomIndex.toString())) {
      throw new Error("User already joined a room for this category");
    }

    const joinedRoom = {
      roomIndex: roomIndex,
      userRole: role,
      timestamp: timestamp,
      seat : dotIndex.seat,
    };

    const clientsCurrentRoomsCollection = collection(
      firebaseDB,
      "clientsCurrentRooms",
      uid,
      "groupsClientParticipates"
    );
    const categoryDocRef = doc(clientsCurrentRoomsCollection, categoryName);
    const roomDocRef = doc(categoryDocRef, "rooms", roomIndex.toString());

    await setDoc(roomDocRef, joinedRoom);

    console.log("Joined room stored in Firestore under user's UID");
  } catch (error) {
    console.error("Error storing joined room in Firestore:", error);
    throw error;
  }
};

export const getSignedUpRooms = async (categoryName) => {
  try {
    const q = query(
      collection(firebaseDB, "clientsCurrentRooms"),
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


export const createClientRoomCollection = async (categoryName) => {
  try {
    const client = auth.currentUser;
    if (!client) {
      throw new Error("Client not authenticated");
    }

    const uid = client.uid;
    const collectionRef = collection(firebaseDB, "clientsCurrentRooms", uid, "groupsClientParticipates");
    const categoryDocRef = doc(collectionRef, categoryName);

    await setDoc(categoryDocRef, {});

    console.log("Client room collection created for category:", categoryName);
  } catch (error) {
    console.error("Error creating client room collection:", error);
    throw error;
  }
};

export const getClientRoomCollection = async (categoryName) => {
  try {
    const client = auth.currentUser;
    if (!client) {
      throw new Error("Client not authenticated");
    }

    const uid = client.uid;
    const collectionRef = collection(firebaseDB, "clientsCurrentRooms", uid, "groupsClientParticipates");
    const categoryDocRef = doc(collectionRef, categoryName);
    const docSnapshot = await getDoc(categoryDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.ref;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting client room collection:", error);
    throw error;
  }
};


