// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "better-together-dev.firebaseapp.com",
  projectId: "better-together-dev",
  storageBucket: "better-together-dev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_KEY_MESSAGE_SENDER_ID ,
  appId: process.env.REACT_APP_FIREBASE_KEY_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_KEY_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();