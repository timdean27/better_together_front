import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { AuthContext } from "./Context/AuthContext";

const FireBaseLogin = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { currentUser, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      navigate("/FireBaseLogin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div className="login">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!</span>}
          </form>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
          <Link to="/create-user">Create New User</Link>
        </div>
      ) : (
        <button onClick={logout}>Log Out</button>
      )}
    </div>
  );
};

export default FireBaseLogin;