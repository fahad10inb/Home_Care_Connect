import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth functions
import './Choose.css';

export const Choose = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle customer registration
  const handleCustomerRegister = async () => {
    navigate('/register'); // Redirect to customer registration
  };

  // Handle provider registration
  const handleProviderRegister = async () => {
    navigate('/register'); // Redirect to provider registration
  };

  return (
    <div>
      <div className='title'>
        <h1>Choose Your User Type</h1>
      </div>
      <div className='container_choose'>
        <div className='card-container-1'>
          <h3 className='card-title'>CUSTOMER</h3>
          <p className='card-description'>
            If you're looking to access our services, please log in or register to create a new account.
          </p>
          <div className='two_buttons'>
            <a href='/login' className='card-btn'>Login</a> {/* Link to Customer Login */}
            <button onClick={handleCustomerRegister} className='card-btn'>Register</button>
          </div>
        </div>

        <div className='card-container-2'>
          <h3 className='card-title'>PROVIDER</h3>
          <p className='card-description'>
            Trained employees who are ready to offer services to customers can login here.
          </p>
          <div className='two_buttons'>
            <a href='/plogin' className='card-btn'>Login</a> {/* Link to Provider Login */}
            <button onClick={handleProviderRegister} className='card-btn'>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};
