import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { AuthContext } from "../Components/Authentication/Context/AuthContext";

const Home = ({ currentUser }) => {
  const navitage = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth)
        .then(localStorage.removeItem("user"))
        .then((currentUser = null));
    } catch (err) {
      console.error(err);
    }
    navitage("/FireBaseLogin");
  };
  return (
    <div>
      <div className="homepage-container">HOME</div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Home;
