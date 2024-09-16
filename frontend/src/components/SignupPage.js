import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonFill, EnvelopeFill, LockFill, Image } from "react-bootstrap-icons";
import loginimg from "../components/img/R2.png"; // Adjust the path as necessary
import "./CSS/Register.css"; // Ensure this CSS file exists and includes your styling

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilepic: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function register(payload) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        payload
      );
      toast.success(response.data.message || "Registration Successful");
      navigate("/SignIn");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }
    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms");
      return;
    }
    setError("");
    await register(formData);
  };

  return (
    <div className="hero">
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg" style={{ maxWidth: "900px" }} id="hero1">
          <div className="card-body p-0">
            <div className="row g-0">
              {/* Left Image Section */}
              <div className="col-lg-5 d-none d-lg-block">
                <img
                  src={loginimg}
                  alt="Person interacting with screens"
                  className="img-fluid h-80"
                  style={{
                    borderTopLeftRadius: ".25rem",
                    borderBottomLeftRadius: ".25rem",
                    marginTop: "100px",
                  }}
                />
              </div>

              {/* Right Form Section */}
              <div className="col-lg-7 p-5">
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  {/* First Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Username Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <EnvelopeFill />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Profile Picture Input
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Image />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add profile pic"
                        name="profilepic"
                        value={formData.profilepic}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}

                  {/* Agree Terms Checkbox */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to all terms
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="register"
                    className="btn btn-danger text-white mb-3"
                  >
                    Register
                  </button>

                  {/* Redirect to Sign In */}
                  <div className="text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/SignIn">
                        <span className="text-info">Sign In</span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
