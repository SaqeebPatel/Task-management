
import React, { useState, useEffect } from "react";
import "../CSS/AccountInformation.css"; 
import axios from "axios";

const AccountInformation = () => {
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false); // New state to toggle forms
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/userinfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the password change
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
            <form>
              <label>First Name</label>
              <input type="text" placeholder={user.firstname} />

              <label>Last Name</label>
              <input type="text" placeholder={user.lastname} />

              <label>Email Address</label>
              <input type="email" placeholder={user.email} />

              <label>Contact Number</label>
              <input type="text" placeholder="Contact Number" />

              <label>Position</label>
              <input type="text" placeholder="Position" />

              <div className="form-buttons">
                <button type="submit" className="update-btn">Update Info</button>
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
              <button type="submit" className="update-btn">Update Password</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;
