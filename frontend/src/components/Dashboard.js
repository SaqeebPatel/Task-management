
// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Nav, Container, Image } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import TaskDashboard from "../components/SideNavbarItems/TaskDashboard";
import Navbar from "../components/Navbar";
import AdTaskModal from "../components/SideNavbarItems/AddTaskModal";
import TaskCategory from "../components/SideNavbarItems/TaskCategories";
import AccountInformation from "../components/SideNavbarItems/AccountInformation";
import SignInPage from "../components/SignInPage";
import "../components/CSS/Sidebar.css";

const Dashboard = () => {
  const [user, setUser] = useState({});

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

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="d-flex" style={{ marginTop: "3%" }}>
        <div
          className="d-flex flex-column bg-danger text-white p-3 sidebar"
          id="sidebar"
        >
          <div className="profile-pic-container">
          <Nav.Link as={Link} to="accountInformation" className="text-white mb-3">
            <img
              src="https://mrwallpaper.com/images/hd/cool-smiley-profile-picture-6lqzc2aegkuxbini.jpg"
              alt="Profile"
              className="profile-pic"
            />
           </Nav.Link>
          </div>
          <div className="text-center mt-5">
            <h5>
              {user.firstname}
              <span style={{ marginLeft: "7px" }}>{user.lastname}</span>
            </h5>
            <p>{user.email}</p>
          </div>

          <Nav className="d-flex flex-column vh-100">
            <div>
              <Nav.Link
                as={Link}
                to="taskDashboard"
                className="text-white mb-3"
              >
                <i className="bi bi-grid-fill me-2"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="vitaltask" className="text-white mb-3">
                <i className="bi bi-exclamation-circle-fill me-2"></i> Vital
                Task
              </Nav.Link>
              <Nav.Link as={Link} to="my-task" className="text-white mb-3">
                <i className="bi bi-list-task me-2"></i> My Task
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="taskCategory"
                className="text-white mb-3"
              >
                <i className="bi bi-folder-fill me-2"></i> Task Categories
              </Nav.Link>
              <Nav.Link as={Link} to="settings" className="text-white mb-3">
                <i className="bi bi-gear-fill me-2"></i> Settings
              </Nav.Link>
              <Nav.Link as={Link} to="help" className="text-white mb-3">
                <i className="bi bi-question-circle-fill me-2"></i> Help
              </Nav.Link>
            </div>

            <Nav.Link as={Link} to="signInPage" className="text-white mb-3 mt-auto">
              <i className="bi bi-box-arrow-left me-2"></i> Logout
            </Nav.Link>
          </Nav>
        </div>

        <div
          className="content"
          style={{ marginLeft: "60px", padding: "20px", width: "100%" }}
        >
          <Routes>
            <Route path="taskDashboard" element={<TaskDashboard />} />
          
 
            <Route path="taskCategory" element={<TaskCategory/>} />
          
           
         
            <Route path="ad-task" element={<AdTaskModal />} />
            <Route path="accountInformation" element={<AccountInformation/>} />
            <Route path="signInPage" element={<SignInPage/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;