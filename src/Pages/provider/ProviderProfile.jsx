import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderProfile = () => {
    const navigate = useNavigate();
    
    // Example provider data
    const provider = {
        name: 'John Doe',
        username: 'john123',
        email: 'john@example.com',
        phone: '123-456-7890',
        serviceType: 'Plumbing',
        isAvailable: true
    };

    const [isAvailable, setIsAvailable] = useState(provider.isAvailable);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-[#4B49AC] text-white w-64 p-5 flex flex-col">
                <h1 className="text-lg font-bold mb-5">Home Care Connect</h1>
                <ul>
                    <li className="mb-4 hover:text-gray-300 cursor-pointer" onClick={() => navigate('/')}>Home</li>
                    <li className="mb-4 hover:text-gray-300 cursor-pointer">Dashboard</li>
                    <li className="mb-4 hover:text-gray-300 cursor-pointer">Help</li>
                    <li className="mb-4 hover:text-gray-300 cursor-pointer">Profile</li>
                    <li className="hover:text-gray-300 cursor-pointer">Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5">
                {/* Navbar */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">🏠</span> {/* Home Icon */}
                        <h1 className="text-2xl font-bold">Home Care Connect</h1>
                    </div>
                    <span className="text-2xl">👤</span> {/* Man symbol */}
                </div>

                {/* Profile Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Provider Profile</h2>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Name:</label>
                        <p className="text-gray-900">{provider.name}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Username:</label>
                        <p className="text-gray-900">{provider.username}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Email:</label>
                        <p className="text-gray-900">{provider.email}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Phone Number:</label>
                        <p className="text-gray-900">{provider.phone}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Service Type:</label>
                        <p className="text-gray-900">{provider.serviceType}</p>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Availability:</span>
                        <div className="flex items-center">
                            <label className="mr-2">{isAvailable ? 'Available' : 'Not Available'}</label>
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={() => setIsAvailable(!isAvailable)}
                                className="toggle-checkbox"
                            />
                        </div>
                    </div>

                    <button
                        className="bg-[#98BDFF] text-white rounded px-4 py-2 hover:bg-[#4B49AC] transition duration-300"
                        onClick={() => alert('Profile Updated!')}
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
