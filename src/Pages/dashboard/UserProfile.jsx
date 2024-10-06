import React from 'react';
import { Home, HelpCircle, User, LogOut } from 'lucide-react'; // Icons
import pic from "../../images/pic.jpeg"; // Update the path if needed
import { useNavigate } from 'react-router-dom'; // For navigation

const UserProfile = ({ toggleProfile }) => {
  const navigate = useNavigate(); // Navigation hook for redirection

  // Sample past bookings data
  const bookings = [
    {
      id: 1,
      service: 'Plumbing',
      provider: 'John Smith',
      date: '2024-09-25',
      status: 'Completed'
    },
    {
      id: 2,
      service: 'Cleaning',
      provider: 'Sarah Lee',
      date: '2024-09-18',
      status: 'Completed'
    },
    {
      id: 3,
      service: 'Electrical',
      provider: 'Mike Davis',
      date: '2024-09-12',
      status: 'Completed'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B49AC] text-white transition-colors duration-300 ease-in-out hover:bg-[#3f3e91]">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Home Care Connect</h2>
        </div>
        <nav className="mt-8">
          {['Home', 'Dashboard', 'Help', 'Profile', 'Logout'].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                if (index === 0) navigate('/');
                if (index === 4) toggleProfile(); // For closing the profile page
              }}
              className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#7978E9] hover:translate-x-1"
            >
              {index === 0 && <Home className="mr-2" size={20} />}
              {index === 1 && <User className="mr-2" size={20} />}
              {index === 2 && <HelpCircle className="mr-2" size={20} />}
              {index === 3 && <User className="mr-2" size={20} />}
              {index === 4 && <LogOut className="mr-2" size={20} />}
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Profile info section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-6">
              <img
                src={pic}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-[#4B49AC]"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
                <p className="text-gray-600">Email: john.doe@example.com</p>
                <p className="text-gray-600">Username:John_Doe</p>
                <p className="text-gray-600">Location:New York</p>
                <p className="text-gray-600">Phone Number:9872343239</p>
                <button
                  onClick={toggleProfile}
                  className="mt-4 bg-[#7DA0FA] text-white py-2 px-4 rounded hover:bg-[#6a8fe3] transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Past bookings section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Past Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-medium text-gray-700">{booking.service}</h4>
                  <p className="text-gray-600">Provider: {booking.provider}</p>
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className={`text-${booking.status === 'Completed' ? 'green' : 'yellow'}-600`}>Status: {booking.status}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
