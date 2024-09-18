


// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import axios from "axios";
// import AddTaskModal from "./AddTaskModal";
// import InviteModal from "./InviteModal"; // Import the InviteModal component
// import "../CSS/TaskDashboard.css";

// function TaskDashboard() {
//   const [modalShow, setModalShow] = useState(false);
//   const [inviteModalShow, setInviteModalShow] = useState(false); // Manage InviteModal state
//   const [user, setUser] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [expandedTask, setExpandedTask] = useState(null);

//   const handleModalClose = () => setModalShow(false);
//   const handleModalShow = () => setModalShow(true);

//   const handleInviteModalClose = () => setInviteModalShow(false); // Close Invite modal
//   const handleInviteModalShow = () => setInviteModalShow(true); // Show Invite modal

//   useEffect(() => {
//     async function getUserInfo() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/user/userinfo",
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );
//         setUser(response.data.user);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getUserInfo();
//   }, []);

//   useEffect(() => {
//     async function getAllTasks() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/task/getalltask",
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );
//         setTasks(response.data.modifiedtask);
//         console.log(response.data.modifiedtask);
//       } catch (error) {
//         console.log("Error fetching tasks:", error);
//       }
//     }
//     getAllTasks();
//   }, []);

//   const getStatusPercentage = (status) => {
//     const totalTasks = tasks.length;
//     if (totalTasks === 0) return 0;

//     const statusCount = tasks.filter((task) => task.status === status).length;
//     return Math.round((statusCount / totalTasks) * 100);
//   };

//   const handleReadMore = (taskId) => {
//     setExpandedTask(expandedTask === taskId ? null : taskId);
//   };

//   return (
//     <div className="container" style={{ marginTop: "10%" }}>
//       <Container>
//         <Row>
//           <Col>
//             <h3>Welcome back, {user.firstname} 👋</h3>
//           </Col>
//           <Col className="text-end">
//             <Button variant="outline-danger" onClick={handleInviteModalShow}>
//               + Invite
//             </Button>
//           </Col>
//         </Row>

//         {/* Other TaskDashboard content */}
//                 <Row className="mt-1">
//           <Col md={8}>
         
//          <div className="task-section">
//   <Row className="align-items-center">
//      <Col>
//       <h5>To-Do</h5>
//     </Col>
//      <Col className="text-end">
//       <Button variant="outline-danger" onClick={handleModalShow}>
//         + Add Task
//       </Button>
//     </Col>
//   </Row>

//   <Row>
//     {tasks
//       .filter((task) => task.status !== "Completed")
//       .map((task) => (
//         <Col md={6} key={task._id}>
//           <Card className="mb-4 task-card">
//             <Card.Body>
//               <Row>
//                 {/* Left Column for Text */}
//                 <Col xs={8}>
//                   <Card.Title>{task.title}</Card.Title>
//                   <Card.Text>
//                     {expandedTask === task._id
//                       ? task.description
//                       : `${task.description.substring(0, 100)}...`}
//                     {task.description.length > 100 && (
//                       <Button
//                         variant="link"
//                         onClick={() => handleReadMore(task._id)}
//                       >
//                         {expandedTask === task._id
//                           ? "Read Less"
//                           : "Read More"}
//                       </Button>
//                     )}
//                     <br />
//                     Priority:{" "}
//                     <span style={{ color: "skyblue" }}>{task.priority}</span>{" "}
//                     | Status:{" "}
//                     <span style={{ color: "red" }}>{task.status}</span>
//                   </Card.Text>
//                 </Col>

//                 {/* Right Column for Image */}
//                 <Col xs={4} className="text-center">
//                   <Image
//                     src={
//                       task.image
//                         ? task.image
//                         : "http://localhost:5000/uploads/default-image.jpg"
//                     }
//                     rounded
//                     fluid
//                     style={{ width: "100px", height: "100px" }}
//                   />
//                 </Col>
//               </Row>
//               <hr />
//               <Row className="mt-2">
//                 <Col xs={12} className="text-end">
//                   <small className="text-muted">
//                     Created on:{" "}
//                     {new Date(task.taskDate).toLocaleDateString()}
//                   </small>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//   </Row>
// </div>

//           </Col>

//           <Col md={4}>
//             <div className="task-section">
//               <h5>Task Status</h5>
//               <div className="circle-container d-flex justify-content-between">
//                 <div style={{ width: 80, height: 80 }}>
//                   <CircularProgressbar
//                     value={getStatusPercentage("Completed")}
//                     text={`${getStatusPercentage("Completed")}%`}
//                     styles={buildStyles({
//                       pathColor: "green",
//                       textColor: "green",
//                       trailColor: "#d6d6d6",
//                     })}
//                   />
//                   <p className="text-center mt-2">Completed</p>
//                 </div>

//                 <div style={{ width: 80, height: 80 }}>
//                   <CircularProgressbar
//                     value={getStatusPercentage("Inprogress")}
//                     text={`${getStatusPercentage("Inprogress")}%`}
//                     styles={buildStyles({
//                       pathColor: "blue",
//                       textColor: "blue",
//                       trailColor: "#d6d6d6",
//                     })}
//                   />
//                   <p className="text-center mt-2">In Progress</p>
//                 </div>

//                 <div style={{ width: 80, height: 80 }}>
//                   <CircularProgressbar
//                     value={getStatusPercentage("Not started")}
//                     text={`${getStatusPercentage("Not started")}%`}
//                     styles={buildStyles({
//                       pathColor: "red",
//                       textColor: "red",
//                       trailColor: "#d6d6d6",
//                     })}
//                   />
//                   <p className="text-center mt-2">Not Started</p>
//                 </div>
//               </div>
//             </div>

//             <div className="task-section mt-4">
//               <h5>Completed Tasks</h5>
//               <Row>
//                 {tasks
//                   .filter((task) => task.status === "Completed")
//                   .map((task) => (
//                     <Col key={task._id}>
//                       <Card className="mb-4 task-card">
//                         <Card.Body>
//                           <Row>
//                             <Col xs={8}>
//                               <Card.Title>{task.title}</Card.Title>
//                               <Card.Text>
//                                 {task.description.length > 100
//                                   ? `${task.description.substring(0, 100)}...`
//                                   : task.description}
//                                 <br />
//                                 Status:{" "}
//                                 <span style={{ color: "green" }}>
//                                   {task.status}
//                                 </span>
//                               </Card.Text>
//                             </Col>
//                             <Col xs={4} className="text-center">
//                               <Image
//                                 src={
//                                   task.image
//                                     ? task.image
//                                     : "http://localhost:5000/uploads/default-image.jpg"
//                                 }
//                                 rounded
//                                 fluid
//                                 style={{ width: "100px", height: "100px" }}
//                               />
//                             </Col>
//                           </Row>
//                           <hr />
//                           <Row className="mt-2">
//                             <Col xs={12} className="text-end">
//                               <small className="text-muted">
//                                 Created on:{" "}
//                                 {new Date(task.taskDate).toLocaleDateString()}
//                               </small>
//                             </Col>
//                           </Row>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   ))}
//               </Row>
//             </div>
//           </Col>
//         </Row>

        
      
//         <InviteModal show={inviteModalShow} handleClose={handleInviteModalClose} /> {/* InviteModal */}
//         <AddTaskModal show={modalShow} handleClose={handleModalClose} />
//       </Container>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import InviteModal from "./InviteModal"; // Make sure InviteModal is imported
import "../CSS/TaskDashboard.css";

function TaskDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [inviteModalShow, setInviteModalShow] = useState(false); // Define inviteModalShow state
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleInviteModalClose = () => setInviteModalShow(false); // Close Invite modal
  const handleInviteModalShow = () => setInviteModalShow(true);   // Show Invite modal

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

  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/getalltask",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTasks(response.data.modifiedtask);
        console.log(response.data.modifiedtask);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    }
    getAllTasks();
  }, []);

  const getStatusPercentage = (status) => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return 0;
    const statusCount = tasks.filter((task) => task.status === status).length;
    return Math.round((statusCount / totalTasks) * 100);
  };

  const handleReadMore = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="dashboard-container" style={{ marginTop: "9%" }}>
      <Container>
        {/* Header Section */}
        <Row className="align-items-center">
          <Col>
            <h3>Welcome back, {user.firstname} 👋</h3>
          </Col>
          <Col className="text-end">
            <Button variant="outline-danger" onClick={handleInviteModalShow}>
              + Invite
            </Button>
          </Col>
        </Row>

        {/* Task Section */}
        <Row className="mt-3">
          <Col md={8} className="task-column">
            <div className="task-section">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>To-Do</h5>
                <Button
                  variant="link"
                  className="add-task-btn"
                  onClick={handleModalShow}
                >
                  <span style={{ color: "orange" }}>+</span> Add Task
                </Button>
              </div>
              <Row>
                {tasks
                  .filter((task) => task.status !== "Completed")
                  .map((task) => (
                    <Col md={12} key={task._id}>
                      <Link
                        to={`taskdetails/${task._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Card className="mb-4 task-card shadow-sm">
                          <Card.Body>
                            <Row>
                              <Col xs={8}>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>
                                  {expandedTask === task._id
                                    ? task.description
                                    : `${task.description.substring(
                                        0,
                                        100
                                      )}...`}
                                  {task.description.length > 100 && (
                                    <Button
                                      variant="link"
                                      className="read-more-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleReadMore(task._id);
                                      }}
                                    >
                                      {expandedTask === task._id
                                        ? "Read Less"
                                        : "Read More"}
                                    </Button>
                                  )}
                                  <br />
                                  Priority:{" "}
                                  <span className="priority-text">
                                    {task.priority}
                                  </span>
                                  {" | "}
                                  Status:{" "}
                                  <span className="status-text">
                                    {task.status}
                                  </span>
                                </Card.Text>
                              </Col>
                              <Col xs={4} className="text-center">
                                <Image
                                  src={
                                    task.image
                                      ? task.image
                                      : "http://localhost:5000/uploads/default-image.jpg"
                                  }
                                  rounded
                                  fluid
                                  style={{ width: "100px", height: "100px" }}
                                />
                              </Col>
                            </Row>
                            <hr />
                            <Row className="mt-2">
                              <Col xs={12} className="text-end">
                                <small className="text-muted">
                                  Created on:{" "}
                                  {new Date(task.taskDate).toLocaleDateString()}
                                </small>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>

          {/* Task Status Section */}
          <Col md={4}>
            <div className="task-section">
              <h5>Task Status</h5>
              <div className="circle-container d-flex justify-content-between">
                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Completed")}
                    text={`${getStatusPercentage("Completed")}%`}
                    styles={buildStyles({
                      pathColor: "green",
                      textColor: "green",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">Completed</p>
                </div>

                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Inprogress")}
                    text={`${getStatusPercentage("Inprogress")}%`}
                    styles={buildStyles({
                      pathColor: "blue",
                      textColor: "blue",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">In Progress</p>
                </div>

                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Not started")}
                    text={`${getStatusPercentage("Not started")}%`}
                    styles={buildStyles({
                      pathColor: "red",
                      textColor: "red",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">Not Started</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="task-section mt-4">
              <h5>Completed Tasks</h5>
              <Row>
                {tasks
                  .filter((task) => task.status === "Completed")
                  .map((task) => (
                    <Col key={task._id}>
                      <Card className="mb-4 task-card shadow-sm">
                        <Card.Body>
                          <Row>
                            <Col xs={8}>
                              <Card.Title>{task.title}</Card.Title>
                              <Card.Text>
                                {task.description.length > 100
                                  ? `${task.description.substring(0, 100)}...`
                                  : task.description}
                                <br />
                                Status:{" "}
                                <span className="status-text">
                                  {task.status}
                                </span>
                              </Card.Text>
                            </Col>
                            <Col xs={4} className="text-center">
                              <Image
                                src={
                                  task.image
                                    ? task.image
                                    : "http://localhost:5000/uploads/default-image.jpg"
                                }
                                rounded
                                fluid
                                style={{ width: "100px", height: "100px" }}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <Row className="mt-2">
                            <Col xs={12} className="text-end">
                              <small className="text-muted">
                                Created on:{" "}
                                {new Date(task.taskDate).toLocaleDateString()}
                              </small>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal Components */}
      <AddTaskModal show={modalShow} handleClose={handleModalClose} />
      <InviteModal show={inviteModalShow} onHide={handleInviteModalClose} /> {/* Invite Modal */}
    </div>
  );
}

export default TaskDashboard;
