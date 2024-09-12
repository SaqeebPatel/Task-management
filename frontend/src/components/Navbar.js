// import React, { useState } from "react";
// import { FaSearch, FaBell, FaCalendarAlt, FaUser } from "react-icons/fa";
// import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
// import { format } from 'date-fns';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../components/CSS/Navbar.css'; // Custom styles for the Navbar

// const Navbar = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [date, setDate] = useState(new Date());

//   const toggleCalendar = () => setShowCalendar(!showCalendar);
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false);
//   };

//   const currentDate = format(new Date(), 'dd MMM yyyy, EEEE');

//   return (
//     <div className="navbar">
//       <div className="navbar-header">
//         <div className="navbar-title">Dashboard</div>
//         <InputGroup className="mb-3 search-bar">
//           <Form.Control placeholder="Search..." />
//           <Button variant="outline-secondary">
//             <FaSearch />
//           </Button>
//         </InputGroup>
       
//         <div className="navbar-right">
//           <div className="icons">
//             <FaBell className="icon" />
//             <FaCalendarAlt className="icon" onClick={toggleCalendar} />
//             {showCalendar && (
//               <div className="calendar-popup">
//                 <Calendar
//                   onChange={handleDateChange}
//                   value={date}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="date-display">{currentDate}</div>
//         </div>
//       </div>
    
      
//       <hr />
      
//     </div>
//   );
// };










// // export default Navbar;
// import React, { useState } from "react";
// import {
//   Container,
//   Col,
//   Form,
//   Button,
//   Modal,
//   Navbar as BSNavbar,
//   Nav,
//   Row,
// } from "react-bootstrap";
// import { FaSearch, FaBell, FaCalendarAlt } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Navbar = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleCalendarClick = () => setShowCalendar(true);
//   const handleCloseCalendar = () => setShowCalendar(false);

//   const getCurrentDateString = () => {
//     const date = new Date();
//     const options = {
//       weekday: "long",
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     };
//     return date.toLocaleDateString(undefined, options);
//   };

//   return (
//     <>
//       <BSNavbar expand="md" className="mt-4"style={{ maxWidth: "100%", backgroundColor: "#f0f8ff" }}>
//         <Container fluid >
//           <BSNavbar.Brand href="#" className="text-center text-md-left">
//             <h2 style={{ fontSize: "36px" }}>
//               <span style={{ color: "#F46B6B" }}>Dash</span>board
//             </h2>
//           </BSNavbar.Brand>

//           <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
//           <BSNavbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto w-100">
//               <Col xs="12" md="6" className="mt-3 mt-md-0">
//                 <Form className="d-flex justify-content-center justify-content-md-start">
//                   <Form.Control
//                     type="search"
//                     placeholder="Search your task here..."
//                     className="me-2"
//                     style={{
//                       borderRadius: "30px",
//                       backgroundColor: "#F9FAFD",
//                       paddingLeft: "20px",
//                       border: "none",
//                       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                     }}
//                   />
//                   <Button
//                     style={{
//                       borderRadius: "50%",
//                       backgroundColor: "#F46B6B",
//                       border: "none",
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaSearch />
//                   </Button>
//                 </Form>
//               </Col>

//               <Col
//                 xs="auto"
//                 className="d-flex align-items-center justify-content-end gap-3 ms-auto"
//                 style={{ marginLeft: "auto" }}
//               >
//                 <Button
//                   className="p-2"
//                   style={{
//                     borderRadius: "50%",
//                     backgroundColor: "#F46B6B",
//                     border: "none",
//                     width: "45px",
//                     height: "45px",
//                   }}
//                 >
//                   <FaBell size={20} color="white" />
//                 </Button>

//                 <Button
//                   className="p-2"
//                   style={{
//                     borderRadius: "50%",
//                     backgroundColor: "#F46B6B",
//                     border: "none",
//                     width: "45px",
//                     height: "45px",
//                   }}
//                   onClick={handleCalendarClick}
//                 >
//                   <FaCalendarAlt size={20} color="white" />
//                 </Button>

//                 <div>
//                   <div
//                     style={{
//                       color: "black",
//                       fontSize: "18px",
//                       textAlign: "right",
//                     }}
//                   >
//                     {getCurrentDateString().split(",")[0]}
//                   </div>
//                   <div
//                     style={{
//                       color: "#1890FF",
//                       fontSize: "16px",
//                       textAlign: "right",
//                     }}
//                   >
//                     {getCurrentDateString().split(",")[1]}
//                   </div>
//                 </div>
//               </Col>
//             </Nav>
//           </BSNavbar.Collapse>
//         </Container>
//       </BSNavbar>

//       <Modal show={showCalendar} onHide={handleCloseCalendar}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Date</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="d-flex justify-content-center">
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             inline
//           />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Navbar;



import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../components/CSS/Navbar.css';

const Navbar = () => {

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}/${month}/${year}`; // Corrected here
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="l"><strong><span>To-</span>Do</strong></a>

                <form className="d-flex w-50">
                    <input className="form-control me-2" type="search" placeholder="Search your task here..." aria-label="Search" />
                    <button className="btn btn-search" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>

                <div className="d-flex align-items-center">
                    <a href="l" className="nav-icons me-3"><i className="bi bi-bell-fill"></i></a>
                    <a href="l" className="nav-icons me-3"><i className="bi bi-calendar3"></i></a>

                    <div className="date-display">
                        <div>Tuesday</div>
                        <div><span>{getCurrentDate()}</span></div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
