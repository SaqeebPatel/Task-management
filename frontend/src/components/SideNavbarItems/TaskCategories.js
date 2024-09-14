import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import navigate
import '../CSS/TaskCategories.css';  
import AddCreatecategoryForm from"./AddCreatecategoryForm";
const TaskCategories = () => {
  const [taskStatus, setTaskStatus] = useState([
    { id: 1, name: 'Completed' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Not Started' }
  ]);

  const [taskPriority, setTaskPriority] = useState([
    { id: 1, name: 'Extreme' },
    { id: 2, name: 'Moderate' },
    { id: 3, name: 'Low' }
  ]);

  const navigate = useNavigate(); // Initialize navigate function

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with id: ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with id: ${id}`);
  };

  const handleCategory = () => {
    navigate("AddCreatecategoryForm"); // Navigate to the add category route
  };

  return (
    <div className="task-categories-container">
      <h2>Task Categories</h2>
      <Button variant="primary" className="mb-3" onClick={handleCategory}>Add Category</Button>

      <div className="mb-5">
        <h4>Task Status</h4>
        <Button variant="link" className="mb-2">+ Add Task Status</Button>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskStatus.map((status, index) => (
              <tr key={status.id}>
                <td>{index + 1}</td>
                <td>{status.name}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit('status', status.id)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete('status', status.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <h4>Task Priority</h4>
        <Button variant="link" className="mb-2">+ Add New Priority</Button>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskPriority.map((priority, index) => (
              <tr key={priority.id}>
                <td>{index + 1}</td>
                <td>{priority.name}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit('priority', priority.id)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete('priority', priority.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskCategories;
