
// export default useAuth;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user data when token is present
      const fetchUserData = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/getUserInfo', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
      };
      fetchUserData();
    } else {
      localStorage.removeItem('token');
      setUser(null); // Clear the user state when token is removed
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', userData);
      toast.success(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      const { token, success } = response.data; 
      setToken(token); 
      setSuccess(success); 
      console.log("*******Token", token);
      console.log("********Success", success);
      toast.success('Logged in successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Incorrect email or password'); 
      } else if (error.response && error.response.status === 404) {
        toast.error('User is not registered'); 
      } else {
        toast.error(error.response?.data?.message || 'Login failed'); 
      }
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
  };

  return {
    user,
    token,
    success,
    register,
    login,
    logout,
  };
};

export default useAuth;
