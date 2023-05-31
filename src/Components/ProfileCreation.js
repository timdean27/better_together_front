import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../firebase";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [helpNeeded, setHelpNeeded] = useState("");
  const [hasReceivedTherapy, setHasReceivedTherapy] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    // Array to store the names of empty fields
    const emptyFields = [];

    // Check if each field is empty and add its name to the emptyFields array
    if (!firstName) {
      emptyFields.push("First Name");
    }
    if (!lastName) {
      emptyFields.push("Last Name");
    }
    if (!address) {
      emptyFields.push("Address");
    }
    if (!helpNeeded) {
      emptyFields.push("Help Needed");
    }
    if (!hasReceivedTherapy) {
      emptyFields.push("Has Received Therapy");
    }

    // If any fields are empty, display an error message
    if (emptyFields.length > 0) {
      const message = `Please fill in the following fields: ${emptyFields.join(", ")}`;
      setErrorMessage(message);
      return;
    }

    // Create a user profile object with the input values
    const userProfile = {
      firstName,
      lastName,
      address,
      helpNeeded,
      hasReceivedTherapy,
    };

    try {
      // Store the user profile data in Firebase
      await createUserProfile(userProfile);

      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error creating user profile:", error);
      // Handle error if profile creation fails
    }
  };

  return (
    <div>
      <h1>Create Profile</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleCreateProfile}>
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
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
