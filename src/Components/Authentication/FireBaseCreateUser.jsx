import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const FireBaseCreateUser = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;
        console.log("New user created:", user);
        // You can perform additional actions after user creation if needed
      })
      .catch((error) => {
        // An error occurred during user creation
        setError(error.message);
      });
  };

  return (
    <div className="create-user">
      <h2>Create User</h2>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default FireBaseCreateUser;