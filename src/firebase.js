import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "better-together-dev.firebaseapp.com",
  projectId: "better-together-dev",
  storageBucket: "better-together-dev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_KEY_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_KEY_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_KEY_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firebaseDB = getFirestore(app);


export const checkUserProfileExists = async (uid) => {
  const userProfileRef = doc(firebaseDB, "userProfiles", uid);
  const userProfileSnapshot = await getDoc(userProfileRef);
  return userProfileSnapshot.exists();
};

export const createUserProfile = async (uid, profileData) => {
  try {
    const userProfileRef = doc(firebaseDB, "userProfiles", uid);
    await setDoc(userProfileRef, profileData);
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (uid) => {
  try {
    console.log("UID:", uid);
    const userProfileRef = doc(firebaseDB, "userProfiles", uid);
    console.log("userProfileRef:", userProfileRef);
    const userProfileSnapshot = await getDoc(userProfileRef);

    if (userProfileSnapshot.exists()) {
      const profileData = userProfileSnapshot.data();
      return { id: userProfileSnapshot.id, ...profileData };
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const userProfileRef = doc(firebaseDB, "userProfiles", uid);
    await setDoc(userProfileRef, profileData, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};