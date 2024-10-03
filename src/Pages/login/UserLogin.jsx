import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in function
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'; // Import your CSS file

export const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Redirect to user dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(
        error.code === 'auth/wrong-password'
          ? "Incorrect password. Please try again."
          : error.code === 'auth/user-not-found'
            ? "No user found with this email."
            : error.code === 'auth/invalid-email'
              ? "Please enter a valid email address."
              : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className='container_login'>
      <form onSubmit={handleSubmit}>
        <h1>Customer Login Form</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className='field'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </div>
          <div className='field'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>
          <button className='fluid ui button blue' type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
