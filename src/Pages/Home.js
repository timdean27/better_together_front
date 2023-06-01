import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Components/Authentication/Context/AuthContext";
import { FaCog } from "react-icons/fa";
import "../css/Home.css";

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
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      {currentUser && (
        <div>
          <button onClick={() => handleRoleSelection("Counselor")}>
            Counselor
          </button>
          <button onClick={() => handleRoleSelection("Patient")}>
            Patient
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
      {selectedRole && (
        <div>
          <h2>You selected: {selectedRole}</h2>
          <p>Do something based on the selected role...</p>
        </div>
      )}
      <Link to="/edit-profile" className="gear-icon">
        <FaCog />
      </Link>
      <div className="content">
        This App is designed to create a safe environment to seek help from a group of people going through similar issues. Each group consists of 6 individuals currently seeking help, 3 advisors who have successfully dealt with the same issue and can provide personal advice, and a professional therapist to moderate and assist.
      </div>
    </div>
  );
};

export default Home;

