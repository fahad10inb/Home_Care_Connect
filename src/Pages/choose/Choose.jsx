import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choose.css';

export const Choose = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle customer registration
  const handleCustomerRegister = () => {
    navigate('/UserRegister/UserRegister'); // Redirect to UserRegister based on correct path
  };

  // Handle provider registration
  const handleProviderRegister = () => {
    navigate('/ProviderRegister/ProviderRegister'); // Redirect to ProviderRegister based on correct path
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
            <a href='/login/UserLogin' className='card-btn'>Login</a> {/* Link to Customer Login */}
            <button onClick={handleCustomerRegister} className='card-btn'>Register</button> {/* Redirect to UserRegister */}
          </div>
        </div>

        <div className='card-container-2'>
          <h3 className='card-title'>PROVIDER</h3>
          <p className='card-description'>
            Trained employees who are ready to offer services to customers can login here.
          </p>
          <div className='two_buttons'>
            <a href='/login/ProviderLogin' className='card-btn'>Login</a> {/* Link to Provider Login */}
            <button onClick={handleProviderRegister} className='card-btn'>Register</button> {/* Redirect to ProviderRegister */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
