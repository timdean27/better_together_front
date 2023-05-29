import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FireBaseCreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    setError("");
  
    // Password validation regex
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number and one special character."
      );
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User creation successful
        console.log("User created:", userCredential.user);
        navigate("/FireBaseLogin"); // Redirect to login page
      })
      .catch((error) => {
        // Handle error during user creation
        console.error("Error creating user:", error);
        setError("Failed to create user. Please try again.");
      });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleCreateUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FireBaseCreateUser;