import React, { useState } from 'react';
import './Dashboard.css'; // Importing the external CSS file

const Dashboard = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const serviceProviders = [
    {
      id: 1,
      name: 'John Doe',
      rating: 4.5,
      email: 'john.doe@example.com',
      available: 'Yes',
      pricePerHour: '$25',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      reviews: 'John is a great worker with a lot of experience in cleaning services.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4.8,
      email: 'jane.smith@example.com',
      available: 'No',
      pricePerHour: '$30',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      reviews: 'Jane is reliable and gets the job done efficiently.',
    },
    // Add more service providers as needed
  ];

  const openModal = (provider) => {
    setSelectedProvider(provider);
  };

  const closeModal = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="/user">Profile</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="main-section">
        <h1>Cleaning Services</h1>
        <div className="card-container_user">
          {serviceProviders.map((provider) => (
            <div className="card_user" key={provider.id}>
              <div className='imgig'>
              <img src={provider.image} alt={provider.name} />
              </div>
              <div className='new_details'>
              <h3>{provider.name}</h3>
              <p>Rating: {provider.rating} ⭐</p>
              <p>Email: {provider.email}</p>
              <p>Available: {provider.available}</p>
              <p>Price per hour: {provider.pricePerHour}</p>
              <button onClick={() => openModal(provider)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Pop-up */}
      {selectedProvider && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedProvider.name}</h2>
            <img src={selectedProvider.image} alt={selectedProvider.name} />
            <p><strong>Email:</strong> {selectedProvider.email}</p>
            <p><strong>Rating:</strong> {selectedProvider.rating}</p>
            <p><strong>Reviews:</strong> {selectedProvider.reviews}</p>
            <div>
              <label>Select Date and Time:</label>
              <input type="datetime-local" />
            </div>
            <button>Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
