import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "better-together-dev.firebaseapp.com",
  projectId: "better-together-dev",
  storageBucket: "better-together-dev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_KEY_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_KEY_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_KEY_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firebaseDB = getFirestore(app);

export const checkUserProfileExists = async (email) => {
  const userProfileRef = doc(firebaseDB, 'userProfiles', email);
  const userProfileSnapshot = await getDoc(userProfileRef);
  return userProfileSnapshot.exists();
};

export const createUserProfile = async (profileData) => {
  const { email } = auth.currentUser;

  if (email) {
    const userProfileRef = doc(firebaseDB, 'userProfiles', email);
    await setDoc(userProfileRef, profileData);
  } else {
    throw new Error('User email not available');
  }
};