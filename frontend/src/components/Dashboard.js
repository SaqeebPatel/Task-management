import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import TaskDashboard from "../components/SideNavbarItems/TaskDashboard";
import Navbar from "../components/Navbar";
import AdTaskModal from "../components/SideNavbarItems/AddTaskModal";
import TaskCategory from "../components/SideNavbarItems/TaskCategories";
import AccountInformation from "../components/SideNavbarItems/AccountInformation";
import AddCreatecategoryForm from "../components/SideNavbarItems/AddCreatecategoryForm";
import SignInPage from "../components/SignInPage";
import Vitaltask from "../components/SideNavbarItems/VitalTasks";
import TaskDetails from "../components/SideNavbarItems/TaskDetails";
import MyTask from "../components/SideNavbarItems/MyTask";
import "../components/CSS/Sidebar.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [isLoggedOut, setIsLoggedOut] = useState(false);  // Track if the user is logged out
  const navigate = useNavigate();  // Initialize useNavigate

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

  // Logout handler function
  const handleLogout = () => {
    localStorage.removeItem("token");  
    setIsLoggedOut(true); 
    navigate("/SignIn");  
  };

  // If the user is logged out, show only the SignInPage
  if (isLoggedOut) {
    return <SignInPage />;
  }

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
              <Nav.Link as={Link} to="Vitaltask" className="text-white mb-3">
                <i className="bi bi-exclamation-circle-fill me-2"></i> Vital
                Task
              </Nav.Link>
              <Nav.Link as={Link} to="myTask" className="text-white mb-3">
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

            {/* Logout link */}
            <Nav.Link
              className="text-white mb-2 mt-auto"
              onClick={handleLogout}  // Call handleLogout on click
            >
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
            <Route path="taskCategory/*" element={<TaskCategory />} />
            <Route path="ad-task" element={<AdTaskModal />} />
            <Route path="accountInformation" element={<AccountInformation />} />
            <Route path="signInPage" element={<SignInPage />} />
            <Route
              path="taskCategory/AddCreatecategoryForm"
              element={<AddCreatecategoryForm />} />
            <Route path="Vitaltask" element={<Vitaltask />} />
            <Route path="myTask" element={<MyTask />} />
            <Route path="/taskDashboard/TaskDetails/:taskId" element={<TaskDetails />} />
            {/* <Route
              path="/taskDashboard/taskdetails/:taskId"
              element={<TaskDetails />} */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
