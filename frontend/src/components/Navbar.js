// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import "./CSS/Navbar.css";

// const Navbar = () => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentDate, setCurrentDate] = useState("");
//   const [currentDay, setCurrentDay] = useState("");

//   useEffect(() => {
//     // Get the current date in a readable format
//     const today = new Date();
//     setCurrentDate(today.toLocaleDateString());

//     // Set the current day of the week
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     setCurrentDay(days[today.getDay()]);
//   }, []);

//   const handleCalendarClick = () => {
//     setShowCalendar(!showCalendar);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">
//           <strong>
//             <span>Dash</span>board
//           </strong>
//         </a>

//         <form className="d-flex w-50">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search your task here..."
//             aria-label="Search"
//           />
//           <button className="btn btn-search" type="submit">
//             <i className="bi bi-search"></i>
//           </button>
//         </form>

//         <div className="d-flex align-items-center">
//           <a href="#" className="nav-icons me-3">
//             {/* Bell icon */}
//             <svg
//               width="45"
//               height="45"
//               viewBox="0 0 45 45"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect width="45" height="45" rx="8" fill="#FF6767" />
//               <path
//                 d="M25.6372 32.4118C25.6372 32.5678 25.5767 32.7174 25.4689 32.8277C25.3612 32.938 25.215 33 25.0627 33H18.9342C18.7818 33 18.6356 32.938 18.5279 32.8277C18.4201 32.7174 18.3596 32.5678 18.3596 32.4118C18.3596 32.2558 18.4201 32.1061 18.5279 31.9958C18.6356 31.8855 18.7818 31.8235 18.9342 31.8235H25.0627C25.215 31.8235 25.3612 31.8855 25.4689 31.9958C25.5767 32.1061 25.6372 32.2558 25.6372 32.4118ZM30.8187 29.1765C30.7025 29.3859 30.5339 29.5599 30.3302 29.6805C30.1266 29.8011 29.8952 29.864 29.66 29.8627H14.3378C14.1021 29.8622 13.8708 29.7981 13.667 29.6769C13.4633 29.5557 13.2944 29.3816 13.1772 29.1723C13.0601 28.9629 12.999 28.7256 13 28.4844C13.001 28.2431 13.0641 28.0064 13.1829 27.798C13.724 26.8431 14.5293 24.151 14.5293 20.6471C14.5293 18.6189 15.3162 16.6739 16.7169 15.2398C18.1177 13.8057 20.0175 13 21.9984 13C23.9793 13 25.8791 13.8057 27.2799 15.2398C28.6806 16.6739 29.4675 18.6189 29.4675 20.6471C29.4675 24.15 30.2738 26.8431 30.8158 27.798C30.9359 28.0068 30.9995 28.2446 31 28.4869C31.0005 28.7291 30.9379 28.9672 30.8187 29.1765ZM29.8218 28.3922C29.0969 27.1176 28.3184 24.1451 28.3184 20.6471C28.3184 18.931 27.6526 17.2851 26.4673 16.0717C25.2821 14.8582 23.6746 14.1765 21.9984 14.1765C20.3222 14.1765 18.7147 14.8582 17.5295 16.0717C16.3442 17.2851 15.6784 18.931 15.6784 20.6471C15.6784 24.1461 14.8989 27.1176 14.174 28.3922C14.1572 28.422 14.1484 28.4558 14.1484 28.4902C14.1484 28.5246 14.1572 28.5584 14.174 28.5882C14.1898 28.6183 14.2133 28.6433 14.242 28.6606C14.2707 28.6779 14.3035 28.6868 14.3368 28.6863H29.659C29.6923 28.6868 29.7251 28.6779 29.7538 28.6606C29.7825 28.6433 29.806 28.6183 29.8218 28.5882C29.8386 28.5584 29.8475 28.5246 29.8475 28.4902C29.8475 28.4558 29.8386 28.422 29.8218 28.3922Z"
//                 fill="white"
//               />
//             </svg>
//           </a>

//           {/* Calendar Icon */}
//           <a href="#" className="nav-icons me-3" onClick={handleCalendarClick}>
//             <svg
//               width="45"
//               height="45"
//               viewBox="0 0 45 45"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect width="45" height="45" rx="8" fill="#FF6767" />
//               <path
//                 d="M30.875 14.6839L26.3711 14.684V13.5626C26.3711 13.2518 26.1193 13 25.8086 13C25.4978 13 25.2461 13.2518 25.2461 13.5626V14.6837H20.7461V13.5626C20.7461 13.2518 20.4943 13 20.1836 13C19.8728 13 19.6211 13.2518 19.6211 13.5626V14.6837H15.125C14.5037 14.6837 14 15.1875 14 15.8089V29.8747C14 30.4961 14.5037 31 15.125 31H30.875C31.4963 31 32 30.4961 32 29.8747V15.8089C32 15.1878 31.4963 14.6839 30.875 14.6839ZM20.1836 15.8089H25.2461V19.2963H20.1836V15.8089ZM30.875 28.0877H15.125V16.8827H30.875V28.0877Z"
//                 fill="white"
//               />
//             </svg>
//           </a>

//           {/* Calendar Dropdown */}
//           {showCalendar && (
//             <div className="calendar-dropdown">
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="MMMM d, yyyy"
//                 inline
//               />
//             </div>
//           )}

//           {/* Date Information */}
//           <div class="d-flex flex-column bd-highlight mb-3 ml-2 justify-content-start">
//         {/* Display current date and day */}
//         <span className="text-black me-3">{currentDate}</span>
//           <span className="text-black me-3">{currentDay}</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./CSS/Navbar.css";

const Navbar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Get the current date in a readable format
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());

    // Set the current day of the week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setCurrentDay(days[today.getDay()]);
  }, []);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <strong>
            <span>Dash</span>board
          </strong>
        </a>

        <form className="d-flex w-50">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search your task here..."
            aria-label="Search"
          />
          <button className="btn btn-search" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        <div className="d-flex align-items-center">
          <a href="#" className="nav-icons me-3" onClick={handleModalClick}>
            {/* Bell icon */}
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="45" height="45" rx="8" fill="#FF6767" />
              <path
                d="M25.6372 32.4118C25.6372 32.5678 25.5767 32.7174 25.4689 32.8277C25.3612 32.938 25.215 33 25.0627 33H18.9342C18.7818 33 18.6356 32.938 18.5279 32.8277C18.4201 32.7174 18.3596 32.5678 18.3596 32.4118C18.3596 32.2558 18.4201 32.1061 18.5279 31.9958C18.6356 31.8855 18.7818 31.8235 18.9342 31.8235H25.0627C25.215 31.8235 25.3612 31.8855 25.4689 31.9958C25.5767 32.1061 25.6372 32.2558 25.6372 32.4118ZM30.8187 29.1765C30.7025 29.3859 30.5339 29.5599 30.3302 29.6805C30.1266 29.8011 29.8952 29.864 29.66 29.8627H14.3378C14.1021 29.8622 13.8708 29.7981 13.667 29.6769C13.4633 29.5557 13.2944 29.3816 13.1772 29.1723C13.0601 28.9629 12.999 28.7256 13 28.4844C13.001 28.2431 13.0641 28.0064 13.1829 27.798C13.724 26.8431 14.5293 24.151 14.5293 20.6471C14.5293 18.6189 15.3162 16.6739 16.7169 15.2398C18.1177 13.8057 20.0175 13 21.9984 13C23.9793 13 25.8791 13.8057 27.2799 15.2398C28.6806 16.6739 29.4675 18.6189 29.4675 20.6471C29.4675 24.15 30.2738 26.8431 30.8158 27.798C30.9359 28.0068 30.9995 28.2446 31 28.4869C31.0005 28.7291 30.9379 28.9672 30.8187 29.1765ZM29.8218 28.3922C29.0969 27.1176 28.3184 24.1451 28.3184 20.6471C28.3184 18.931 27.6526 17.2851 26.4673 16.0717C25.2821 14.8582 23.6746 14.1765 21.9984 14.1765C20.3222 14.1765 18.7147 14.8582 17.5295 16.0717C16.3442 17.2851 15.6784 18.931 15.6784 20.6471C15.6784 24.1461 14.8989 27.1176 14.174 28.3922C14.1572 28.422 14.1484 28.4558 14.1484 28.4902C14.1484 28.5246 14.1572 28.5584 14.174 28.5882C14.1898 28.6183 14.2133 28.6433 14.242 28.6606C14.2707 28.6779 14.3035 28.6868 14.3368 28.6863H29.659C29.6923 28.6868 29.7251 28.6779 29.7538 28.6606C29.7825 28.6433 29.806 28.6183 29.8218 28.5882C29.8386 28.5584 29.8475 28.5246 29.8475 28.4902C29.8475 28.4558 29.8386 28.422 29.8218 28.3922Z"
                fill="white"
              />
            </svg>
          </a>

          {/* Calendar Icon */}
          <a href="#" className="nav-icons me-3" onClick={handleCalendarClick}>
             <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="45" height="45" rx="8" fill="#FF6767" />
              <path
                d="M30.875 14.6839L26.3711 14.684V13.5626C26.3711 13.2518 26.1193 13 25.8086 13C25.4978 13 25.2461 13.2518 25.2461 13.5626V14.6837H20.7461V13.5626C20.7461 13.2518 20.4943 13 20.1836 13C19.8728 13 19.6211 13.2518 19.6211 13.5626V14.6837H15.125C14.5037 14.6837 14 15.1875 14 15.8089V29.8747C14 30.4961 14.5037 31 15.125 31H30.875C31.4963 31 32 30.4961 32 29.8747V15.8089C32 15.1878 31.4963 14.6839 30.875 14.6839ZM20.1836 15.8089H25.2461V19.2963H20.1836V15.8089ZM30.875 28.0877H15.125V16.8827H30.875V28.0877Z"
                fill="white"
              />
            </svg>
          </a>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="calendar-dropdown">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                inline
              />
            </div>
          )}

          {/* Date Information */}
          <div className="d-flex flex-column bd-highlight mb-3 ml-2 justify-content-start">
            <span className="text-black me-3">{currentDate}</span>
            <span className="text-black me-3">{currentDay}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
           <button className="btn-close" onClick={handleCloseModal}>
                  <i className="bi bi-x-circle"></i>
                </button>
          <div className="modal-content container">
            <div className="row">
              <div className="col-md-8">
               
                <h5>Title</h5>
                <p>Description of the notification.</p>
                <p>Priority: High</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Notification"
                  className="modal-img"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
