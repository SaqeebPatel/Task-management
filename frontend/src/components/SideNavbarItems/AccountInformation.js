import React from 'react';
import '../CSS/AccountInformation.css';  // Custom CSS file for this component

const AccountInformation = () => {
  return (
    <div className="account-info-container">
      <div className="go-back">Go Back</div>

      <h2>Account Information</h2>
      
      <div className="profile-section">
        {/* <img src="https://via.placeholder.com/100" alt="User" className="profile-pic" /> */}
        <div>
          <h4>Saqeeb patel</h4>
          <p>saqeeb@Gmail.com</p>
        </div>
      </div>
      
      <div className="info-form">
        <form>
          <label>First Name</label>
          <input type="text" placeholder="First Name" />

          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />

          <label>Email Address</label>
          <input type="email" placeholder="Email Address" />

          <label>Contact Number</label>
          <input type="text" placeholder="Contact Number" />

          <label>Position</label>
          <input type="text" placeholder="Position" />

          <div className="form-buttons">
            <button type="submit" className="update-btn">Update Info</button>
            <button type="button" className="password-btn">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInformation;
