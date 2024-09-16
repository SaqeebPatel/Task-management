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

function InviteModal({ show, handleClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading when fetching begins
      setError(""); // Reset error message before fetching

      try {
        const response = await axios.get("http://localhost:5000/api/user/getusers");
        const data = response.data;

        // Check if the response contains the 'users' property and that it is an array
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Unexpected response format:", data);
          setError("Failed to load users.");
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    if (show) {
      fetchUsers();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered className="invite-modal">
      <Modal.Header closeButton>
        <Modal.Title>Send an invite to a new member</Modal.Title>
        <Button variant="form-label" onClick={handleClose} style={{ marginLeft: "120px" }}>
          Close
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
                style={{ width: "150px", marginLeft: "20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E" }} // Increased width
              >
                Send Invite
              </Button>
            </Form.Group>

            {/* Member List */}
            <div className="member-list">
              {users.length > 0 ? (
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
                !loading && <p>No users found.</p> // Display only if not loading
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
                  style={{ width: "150px", marginLeft: "20px", backgroundColor: "#F24E1E", borderColor: "#F24E1E" }} // Increased width
                >
                  Copy Link
                </Button>
              </div>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Optional footer content */}
      </Modal.Footer>
    </Modal>
  );
}

export default InviteModal;
