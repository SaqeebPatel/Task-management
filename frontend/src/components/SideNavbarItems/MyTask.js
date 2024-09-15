import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card, Badge, Modal, Button, Form } from "react-bootstrap";

import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Mytask() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Fetch tasks from API with token
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/task/getTasksForUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        if (response.data.tasks.length > 0) {
          setSelectedTask(response.data.tasks[0]);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "danger";
      case "In Progress":
        return "primary";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority) => {
    return priority === "Extreme" ? "danger" : "info";
  };

  const handleShowModal = () => {
    setUpdatedTitle(selectedTask.title);
    setUpdatedDescription(selectedTask.description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateTask = () => {
    axios
      .put(`http://localhost:5000/api/task/updateTask/${selectedTask._id}`, {
        title: updatedTitle,
        description: updatedDescription,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks(tasks.map(task => task._id === selectedTask._id ? response.data.task : task));
        setSelectedTask(response.data.task);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/api/task/deleteTask/${taskId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
        setSelectedTask(null);
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "10%",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "20px", // Added padding for better spacing
      }}
    >
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <h4>My Task</h4>
            <ListGroup>
  {tasks && tasks.length > 0 ? (
    tasks.map((task) => (
      <ListGroup.Item
        key={task?._id} // Use optional chaining here
        action
        onClick={() => handleTaskClick(task)}
        className="d-flex align-items-start mb-3 p-3"
        style={{
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          height: "180px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Task content */}
        <div className="me-3">
          {/* Task image */}
          <img
            src={
              task?.image
                ? `http://localhost:5000/uploads/${task.image}`
                : "http://localhost:5000/uploads/default-image.jpg"
            }
            alt="Task"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Text content */}
        <div className="d-flex flex-column justify-content-between">
          <div>
            {/* Task title */}
            <div className="fw-bold mb-1">{task?.title}</div>

            {/* Task description */}
            <div
              className="text-truncate mb-1"
              style={{
                maxWidth: "200px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {task?.description}
            </div>

            {/* Priority and Status */}
            <div className="mb-2">
              <p className="mb-0">
                Priority: <Badge bg={getPriorityColor(task?.priority)}>{task?.priority}</Badge>
              </p>
              <p className="mb-0">
                Status: <Badge bg={getStatusColor(task?.status)}>{task?.status}</Badge>
              </p>
            </div>
          </div>
        </div>
      </ListGroup.Item>
    ))
  ) : (
    <p>No tasks available</p> // Fallback when tasks array is empty
  )}
</ListGroup>

          </Col>

          {/* Task details on the right */}
          <Col md={8}>
            {selectedTask ? (
              <Card
                style={{
                  border: "1px solid #ddd", // Border for better definition
                  borderRadius: "8px", // Rounded corners
                  position: "relative", // Position relative for absolute children
                }}
              >
                <Card.Body
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  {/* Image on the left */}
                  <div style={{ flex: "0 0 150px", marginRight: "20px" }}>
                    <Card.Img
                      src={
                        selectedTask.image
                          ? `http://localhost:5000/uploads/${selectedTask.image}`
                          : "http://localhost:5000/uploads/default-image.jpg"
                      }
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  {/* Content on the right */}
                  <div style={{ flex: "1" }}>
                    <Card.Title>{selectedTask.title}</Card.Title>
                    <p>
                      Priority:{" "}
                      <Badge
                        bg={getPriorityColor(selectedTask.priority)}
                        style={{ marginRight: "5px" }}
                      >
                        {selectedTask.priority}
                      </Badge>
                    </p>
                    <p>
                      Status:{" "}
                      <Badge
                        bg={getStatusColor(selectedTask.status)}
                        style={{ marginRight: "5px" }}
                      >
                        {selectedTask.status}
                      </Badge>
                    </p>
                    Created on:{" "}
                    {new Date(selectedTask.taskDate).toLocaleDateString()}
                    <ul className="mt-3">
                      {selectedTask.actions?.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <Card.Title
                      style={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Title:
                    </Card.Title>
                    <Card.Text>{selectedTask.title}</Card.Text>
                  </div>

                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <Card.Title
                      style={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Description:
                    </Card.Title>
                    <Card.Text>{selectedTask.description}</Card.Text>
                  </div>
                </div>
                <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "10px" }}>
                    <Button variant="link" onClick={handleShowModal} style={{ fontSize: "20px", color: "#007bff" }}>
                      <FaEdit />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteTask(selectedTask._id)}
                      style={{ fontSize: "20px", color: "#dc3545" }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
              </Card>
            ) : (
              <p>My task is not availbel</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal for updating tasks */}
       {/* Update Modal */}
       <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdateTask}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Mytask;