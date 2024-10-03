import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './ProviderLogin.css';

const ProviderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Redirect to provider dashboard
      navigate("/provider");
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(
        error.code === 'auth/wrong-password'
          ? "Incorrect password. Please try again."
          : error.code === 'auth/user-not-found'
            ? "No provider found with this email."
            : error.code === 'auth/invalid-email'
              ? "Please enter a valid email address."
              : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className='container_login'>
      <form onSubmit={handleSubmit}>
        <h1>Provider Login Form</h1>
        <div className='ui form'>
          <div className='field'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
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
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default ProviderLogin;
