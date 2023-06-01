import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Components/Authentication/Context/AuthContext";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import Home from "./Pages/Home";
import CounselorPage from "./Pages/CounselorPage";
import PatientPage from "./Pages/PatientPage";
import CategoryPage from "./Pages/CategoryPage";
import BackButton from "./Components/BackButton";
import ProfileCreation from "./Components/ProfileCreation";
import EditProfile from "./Components/EditProfile";
import { checkUserProfileExists, createUserProfile } from "./firebase";

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/FireBaseLogin" />;
};

function App() {
  const { currentUser } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (currentUser) {
        const exists = await checkUserProfileExists(currentUser.uid);
        setProfileExists(exists);
      }
    };

    checkUserProfile();
  }, [currentUser]);

  const handleProfileCreation = async (profileData) => {
    await createUserProfile(currentUser.uid, profileData);
    setProfileExists(true);
  };

  return (
    <BrowserRouter>
      <BackButton /> {/* Back button available on all pages */}
      <Routes>
        <Route path="/FireBaseLogin" element={<FireBaseLogin />} />
        <Route path="/create-user" element={<FireBaseCreateUser />} />
        <Route
          path="/"
          element={
            profileExists ? (
              <RequireAuth>
                <Home
                  currentUser={currentUser}
                  selectedRole={selectedRole}
                  onRoleSelect={setSelectedRole}
                />
              </RequireAuth>
            ) : (
              <ProfileCreation
                currentUser={currentUser}
                onCreateProfile={handleProfileCreation}
              />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            <RequireAuth>
              <EditProfile currentUser={currentUser} />
            </RequireAuth>
          }
        />
        <Route
          path="/counselor"
          element={
            <RequireAuth>
              <CounselorPage selectedRole={selectedRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/patient"
          element={
            <RequireAuth>
              <PatientPage selectedRole={selectedRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <RequireAuth>
              <CategoryPage selectedRole={selectedRole} />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






