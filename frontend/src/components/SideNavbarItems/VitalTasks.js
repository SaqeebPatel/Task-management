import React from 'react';
import '../CSS/VitalTasks.css';  // Custom CSS file for this component

const VitalTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Walk the dog',
      priority: 'Extreme',
      status: 'Not Started',
      createdOn: '20/06/2023',
      description: 'Take the dog to the park and bring treats as well.',
      details: 'Take Luffy and Jiro for a leisurely stroll around the neighborhood. Enjoy the fresh air...'
    },
    {
      id: 2,
      title: 'Take grandma to hospital',
      priority: 'Moderate',
      status: 'In Progress',
      createdOn: '20/06/2023',
      description: 'Go back home and take grandma to the hospital...',
      details: 'It’s important to be on time for the appointment and ensure her comfort...'
    }
  ];

  return (
    <div className="vital-tasks-container">
      <div className="tasks-list">
        <h3>Vital Tasks</h3>
        <div className="task-card">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className={`priority ${task.priority.toLowerCase()}`}></div>
              <div className="task-info">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <small>
                  Priority: {task.priority} | Status: {task.status} | Created on: {task.createdOn}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="task-details">
        <h4>{tasks[0].title}</h4>
        <p>Priority: {tasks[0].priority}</p>
        <p>Status: {tasks[0].status}</p>
        <p>Created on: {tasks[0].createdOn}</p>
        <p>{tasks[0].details}</p>

        <div className="task-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default VitalTasks;
