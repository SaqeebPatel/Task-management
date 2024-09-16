import React from 'react';
import { Button } from 'react-bootstrap';
import './TaskCard.css';

const TaskCard = () => {
  return (
    <div className="task-card-container">
      <div className="task-card">
        <div className="task-header">
          <img
            src="https://via.placeholder.com/100"
            alt="Birthday Party"
            className="task-image"
          />
          <div>
            <h3>Attend Nischal’s Birthday Party</h3>
            <p>
              Priority: <span className="moderate">Moderate</span>
            </p>
            <p>
              Status: <span className="not-started">Not Started</span>
            </p>
            <p>Created on: 20/06/2023</p>
          </div>
        </div>

        <div className="task-body">
          <p>
            Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)
          </p>
          <ol>
            <li>A cake, with candles to blow out. (Layer cake, cupcake, flat sheet cake)</li>
            <li>The birthday song.</li>
            <li>A place to collect gifts.</li>
          </ol>

          <p>Optional:</p>
          <ul>
            <li>Paper cone-shaped party hats, paper whistles that unroll.</li>
            <li>
              Games, activities (carry an object with your knees, then drop it into a milk bottle.)
            </li>
            <li>
              Lunch: sandwich halves, or pizza slices, juice, pretzels, potato chips...THEN cake & candles and the song.
            </li>
          </ul>
        </div>

        <div className="task-footer">
          <Button variant="danger">
            <i className="bi bi-trash-fill"></i>
          </Button>
          <Button variant="warning">
            <i className="bi bi-pencil-fill"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
