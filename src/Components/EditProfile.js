import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../firebase";

const EditProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [helpNeeded, setHelpNeeded] = useState("");
  const [hasReceivedTherapy, setHasReceivedTherapy] = useState("");

  useEffect(() => {
    // Fetch the user profile data from Firebase
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(currentUser.uid);
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
        setAddress(userProfile.address);
        setHelpNeeded(userProfile.helpNeeded);
        setHasReceivedTherapy(userProfile.hasReceivedTherapy);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error if fetching user profile fails
      }
    };

    fetchUserProfile();
  }, [currentUser.uid]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Create a user profile object with the updated input values
    const updatedProfile = {
      firstName,
      lastName,
      address,
      helpNeeded,
      hasReceivedTherapy,
    };

    try {
      // Update the user profile data in Firebase
      await updateUserProfile(currentUser.uid, updatedProfile);

      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error if profile update fails
    }
  };

  const handleDone = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          placeholder="What help are you looking for?"
          value={helpNeeded}
          onChange={(e) => setHelpNeeded(e.target.value)}
        ></textarea>
        <div>
          <label>
            Have you received therapy before?
            <input
              type="radio"
              value="yes"
              checked={hasReceivedTherapy === "yes"}
              onChange={() => setHasReceivedTherapy("yes")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={hasReceivedTherapy === "no"}
              onChange={() => setHasReceivedTherapy("no")}
            />
            No
          </label>
        </div>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={handleDone}>Done</button>
      </form>
    </div>
  );
};

export default EditProfile;

