import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  // Sample job data
  const initialJobs = [
    {
      id: 1,
      customer: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      date: '2024-10-06',
      time: '2:00 PM',
      location: '123 Main St',
    },
    {
      id: 2,
      customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
      date: '2024-10-07',
      time: '3:00 PM',
      location: '456 Elm St',
    },
    {
      id: 3,
      customer: { name: 'Mike Johnson', email: 'mike@example.com', phone: '555-555-5555' },
      date: '2024-10-08',
      time: '4:00 PM',
      location: '789 Maple St',
    },
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [previousBookings, setPreviousBookings] = useState([]);
  
  const userBookings = {
    'ravikumar@gmail.com': [{ name: 'Ravi Kumar', rating: 5, date: '2024-10-01', time: '1:00 PM', location: '101 First St' }],
    'poojaverma@gmail.com': [{ name: 'Pooja Verma', rating: 4, date: '2024-10-02', time: '2:00 PM', location: '202 Second St' }],
    'aaravshah@gmail.com': [{ name: 'Aarav Shah', rating: 3, date: '2024-10-03', time: '3:00 PM', location: '303 Third St' }],
  };

  // Function to update the first job's details with the logged-in worker's information
  const updateJobWithWorkerInfo = (workerInfo) => {
    setJobs((prev) => {
      const updatedJobs = [...prev];
      if (updatedJobs.length > 0) {
        updatedJobs[0] = { // Update the first job's details
          ...updatedJobs[0],
          customer: { // Replace with worker's details
            name: workerInfo.name,
            email: workerInfo.email,
            phone: workerInfo.phone,
          },
        };
      }
      return updatedJobs;
    });
  };

  // Simulating worker login - replace this part with actual login logic
  useEffect(() => {
    // Simulated worker info after login
    const loggedInWorker = {
      name: 'New Worker',
      email: 'ravikumar@gmail.com', // Change email here to simulate different logins
      phone: '999-999-9999',
    };

    // Call the function to update jobs based on the logged-in worker's email
    if (userBookings[loggedInWorker.email]) {
      updateJobWithWorkerInfo(loggedInWorker);
      setPreviousBookings(userBookings[loggedInWorker.email]); // Set previous bookings based on the email
    }
  }, []); // Call when the component mounts or when a worker logs in

  const acceptBooking = (index) => {
    setPreviousBookings((prev) => [
      ...prev,
      {
        name: jobs[index].customer.name,
        rating: 5, // Assuming default rating, could be dynamic based on user feedback
        date: jobs[index].date,
        time: jobs[index].time,
        location: jobs[index].location,
      },
    ]);

    setJobs((prev) => {
      const updatedJobs = [...prev];
      updatedJobs.splice(index, 1); // Remove accepted job

      return updatedJobs;
    });
  };

  const declineBooking = (index) => {
    setJobs((prev) => {
      const updatedJobs = [...prev];
      updatedJobs.splice(index, 1); // Remove declined job

      return updatedJobs;
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-[#4B49AC] text-white w-64 p-5 flex flex-col">
        <h1 className="text-lg font-bold mb-5">Home Care Connect</h1>
        <ul>
          <li className="mb-4 hover:text-gray-300 cursor-pointer" onClick={() => navigate('/')}>Home</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">Help</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer" onClick={() => navigate('/provider/ProviderProfile')}>Profile</li>
          <li className="hover:text-gray-300 cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏠</span> {/* Home Icon */}
            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          </div>
          <span className="text-2xl">👤</span> {/* Man symbol */}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {jobs.map((job, index) => (
            <div key={job.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="font-bold mb-2">Customer Profile</h2>
              <p><strong>Name:</strong> {job.customer.name}</p>
              <p><strong>Email:</strong> {job.customer.email}</p>
              <p><strong>Phone:</strong> {job.customer.phone}</p>
              <p><strong>Date:</strong> {job.date}</p>
              <p><strong>Time:</strong> {job.time}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <div className="flex justify-between mt-4 gap-4">
                <button className="bg-[#7978E9] text-white rounded px-4 py-2 hover:bg-[#4B49AC] transition duration-300" onClick={() => acceptBooking(index)}>Accept</button>
                <button className="bg-[#F3797E] text-white rounded px-4 py-2 hover:bg-[#F3A4A4] transition duration-300" onClick={() => declineBooking(index)}>Decline</button>
              </div>
            </div>
          ))}
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center mb-5">
          <label className="mr-2">Is Available:</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
            className="toggle-checkbox"
          />
        </div>

        {/* Previous Bookings Button */}
        <button
          className="bg-[#98BDFF] text-white rounded px-4 py-2 hover:bg-[#4B49AC] transition duration-300"
          onClick={() => setShowModal(true)}
        >
          Previous Bookings
        </button>

        {/* Modal for Previous Bookings */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg w-11/12 md:w-1/2">
              <h2 className="text-lg font-bold mb-4">Previous Bookings</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Rating</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Time</th>
                    <th className="border px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">{booking.rating}</td>
                      <td className="border px-4 py-2">{booking.date}</td>
                      <td className="border px-4 py-2">{booking.time}</td>
                      <td className="border px-4 py-2">{booking.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 bg-[#F3797E] text-white rounded px-4 py-2 hover:bg-[#F3A4A4] transition duration-300" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
