import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Components/Authentication/Context/AuthContext";
import { FaCog } from "react-icons/fa"; // Assuming you're using React Icons library

const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);

  const handleRoleSelection = async (role) => {
    localStorage.removeItem("selectedRole");
    setSelectedRole(role);
    localStorage.setItem("selectedRole", role);
    await navigate(`/${role.toLowerCase()}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("selectedRole");
      navigate("/FireBaseLogin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
<div>
  <h1>Welcome to the Home Page</h1>
  {currentUser && (
    <div>
      <button onClick={() => handleRoleSelection("Counselor")}>
        Counselor
      </button>
      <button onClick={() => handleRoleSelection("Patient")}>
        Patient
      </button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )}
  {selectedRole && (
    <div>
      <h2>You selected: {selectedRole}</h2>
      <p>Do something based on the selected role...</p>
    </div>
  )}
  <Link to="/edit-profile">
    <FaCog /> {/* Gear symbol icon */}
  </Link>
  <div>
    This App is to create a safe environment to get help from a group of
    people going through the same issues. Groups are created with 6 people
    currently seeking help with an issue, 3 advisors that have dealt with
    and handled the same issue and are able to give personal advice, and a
    professional therapist to help and moderate.
  </div>
</div>
  );
};

export default Home;
