// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVx0TkRV7_HB6w45RWOLM3saWdkWr-l4A",
  authDomain: "you-map-dev-6723f.firebaseapp.com",
  projectId: "you-map-dev-6723f",
  storageBucket: "you-map-dev-6723f.appspot.com",
  messagingSenderId: "473781569817",
  appId: "1:473781569817:web:342491760e93b1fec69d88",
  measurementId: "G-MB56FXRNQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();