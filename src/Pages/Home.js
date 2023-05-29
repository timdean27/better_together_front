import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth,} from "../firebase";
import { AuthContext } from "../Components/Authentication/Context/AuthContext";

const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" }); // Clear the currentUser state
      navigate("/FireBaseLogin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser && <button onClick={handleLogout}>Log Out</button>}
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
