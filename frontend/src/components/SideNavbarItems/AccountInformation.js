

// export default AccountInformation;
import React, { useState, useEffect } from "react";
import "../CSS/AccountInformation.css"; 
import axios from "axios";

const AccountInformation = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    ContactNumber: "",
    Position: "",
    image: ""
  });
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Fetch user information
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/userinfo", // Adjust your endpoint if needed
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user); // Populate the form with user data
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  // Handle input change for the profile form
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating user information
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/UPuser/${user._id}`, // Replace user._id with the actual ID from the fetched user data
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          ContactNumber: user.ContactNumber,
          Position: user.Position,
          // If you are updating image, add image field here
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      alert("User information updated successfully!");
      console.log(response.data); // Optionally log the response
    } catch (error) {
      console.log("Error updating user information", error);
    }
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handle password update submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add logic for submitting the password change
    console.log("Password Change Data", passwordData);
  };

  return (
    <div className="account-info-container">
      <div className="go-back" onClick={() => setShowPasswordForm(false)}>
        Go Back
      </div>

      <h2>{showPasswordForm ? "Change Password" : "Account Information"}</h2>

      {!showPasswordForm ? (
        // Account Information Form
        <>
          <div className="profile-section">
            {/* Profile Image */}
            
            <img 
              src="https://via.placeholder.com/100" 
              alt="Profile" 
              className="profile-img"
            />

            {/* Profile Details */}
            <div>
              <h4>{user.firstname} {user.lastname}</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="info-form">
            <form onSubmit={handleUpdateInfo}>
              <label>First Name</label>
              <input 
                type="text" 
                name="firstname" 
                value={user.firstname} 
                onChange={handleInputChange}
                placeholder="First Name"
              />

              <label>Last Name</label>
              <input 
                type="text" 
                name="lastname" 
                value={user.lastname} 
                onChange={handleInputChange}
                placeholder="Last Name"
              />

              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={user.email} 
                onChange={handleInputChange}
                placeholder="Email"
              />

              <label>Contact Number</label>
              <input 
                type="text" 
                name="ContactNumber" 
                value={user.ContactNumber} 
                onChange={handleInputChange}
                placeholder="Contact Number"
              />

              <label>Position</label>
              <input 
                type="text" 
                name="Position" 
                value={user.Position} 
                onChange={handleInputChange}
                placeholder="Position"
              />

              <div className="form-buttons">
                <button type="submit" className="update-btn">
                  Update Info
                </button>
                <button 
                  type="button" 
                  className="password-btn" 
                  onClick={() => setShowPasswordForm(true)}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        // Change Password Form
        <div className="info-form">
          <form onSubmit={handlePasswordSubmit}>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
            />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
            />

            <div className="form-buttons">
              <button type="submit" className="update-btn">
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;

