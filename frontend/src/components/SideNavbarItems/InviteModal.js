// import React from "react";
// import { Modal, Button, Form, Dropdown } from "react-bootstrap";
// import "../CSS/InviteModal.css"; // Import the CSS file

// function InviteModal({ show, handleClose }) {
//   return (
//     <Modal show={show} onHide={handleClose} centered className="invite-modal">
//       <Modal.Header closeButton>
//         <Modal.Title>Send an invite to a new member</Modal.Title>
//         <Button variant="form-label" onClick={handleClose} style={{marginLeft:"120px"}}>
//           Close
//         </Button>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formEmail" className="d-flex">
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               className="email-input"
//               style={{width:"400px" , height:"41px"}}
//             />
//             <Button  className="send-button" style={{width:"110px" , marginLeft:"20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E"}}>
//               Send Invite
//             </Button>
//           </Form.Group>

//           {/* Member List */}
//           <div className="member-list">
//             {[
//               { name: "Saqee patel", email: "Saqeebpatel@gmail.com", role: "Can edit" },
//               { name: "Charu", email: "Charu@gmail.com", role: "Can edit" },
//               { name: "sufiyan", email: "sufiyan@gmail.com", role: "Owner" },
//               { name: "Rushi", email: "Rushi@gmail.com", role: "Can edit" },
//             ].map((member, idx) => (
//               <div className="member-item" key={idx}>
//                 <img
//                   src={`https://via.placeholder.com/40?text=${member.name[0]}`}
//                   alt={member.name}
//                   className="member-avatar"
//                 />
//                 <div className="member-details">
//                   <p className="member-name">{member.name}</p>
//                   <p className="member-email">{member.email}</p>
//                 </div>
//                 <Dropdown>
//                   <Dropdown.Toggle variant="form-label" id="dropdown-basic">
//                     {member.role}
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item>Can edit</Dropdown.Item>
//                     <Dropdown.Item>Owner</Dropdown.Item>
//                     <Dropdown.Item>Remove</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </div>
//             ))}
//           </div>

//           {/* Project Link */}
//           <Form.Group controlId="formProjectLink" className="project-link-group">
//             <Form.Label>Project Link</Form.Label>
//             <div className="d-flex">
//               <Form.Control
//                 type="text"
//                 value="https://saqeeb.onrender.com/"
//                 readOnly
//                 className="project-link"
//                 style={{width:"400px" , height:"41px"}}
//               />
//               <Button className="copy-link-button"style={{width:"110px" , marginLeft:"20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E"}}>
//                 Copy Link
//               </Button>
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
      
//       </Modal.Footer>
//     </Modal>
//   );
// }
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../CSS/InviteModal.css"; // Import the CSS file

function InviteModal({ show, onHide }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("http://localhost:5000/api/user/getusers");
        const { users: fetchedUsers } = response.data;

        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
        } else {
          setError("Failed to load users.");
        }
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchUsers();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered className="invite-modal">
      <Modal.Header>
        <Modal.Title>Send an invite to a new member</Modal.Title>
        <Button
          variant="close"
          onClick={onHide}
          aria-label="Close"
          style={{ marginLeft: "auto" }} // Move to the right
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Form>
            <Form.Group controlId="formEmail" className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="email-input"
                style={{ width: "400px", height: "41px" }}
              />
              <Button
                className="send-button"
                style={{ width: "150px", marginLeft: "20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E" }}
              >
                Send Invite
              </Button>
            </Form.Group>

            {/* Member List */}
            <div className="member-list">
              {users.length ? (
                users.map((user) => (
                  <div className="member-item" key={user.email}>
                    <img
                      src={`https://via.placeholder.com/40?text=${user.username[0]}`}
                      alt={user.username}
                      className="member-avatar"
                    />
                    <div className="member-details">
                      <p className="member-name">{user.username}</p>
                      <p className="member-email">{user.email}</p>
                    </div>
                    <Dropdown className="member-role-dropdown">
                      <Dropdown.Toggle variant="form-label" id="dropdown-basic">
                        Can edit
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Can edit</Dropdown.Item>
                        <Dropdown.Item>Owner</Dropdown.Item>
                        <Dropdown.Item>Remove</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ))
              ) : (
                !loading && <p>No users found.</p>
              )}
            </div>

            {/* Project Link */}
            <Form.Group controlId="formProjectLink" className="project-link-group">
              <Form.Label>Project Link</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value="https://saqeeb.onrender.com/"
                  readOnly
                  className="project-link"
                  style={{ width: "400px", height: "41px" }}
                />
                <Button
                  className="copy-link-button"
                  style={{ width: "150px", marginLeft: "20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E" }}
                >
                  Copy Link
                </Button>
              </div>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default InviteModal;
