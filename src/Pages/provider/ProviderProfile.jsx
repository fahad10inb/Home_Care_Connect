import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProviderProfile = () => {
    const navigate = useNavigate();
    
    const [provider, setProvider] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);

    const providerId = auth.currentUser?.uid;
    const providerEmail = auth.currentUser?.email;  // Get the current user's email

    const specialEmails = ['aaravshah@gmail.com', 'ravikumar@gmail.com', 'poojaverma@gmail.com'];  // The three special email IDs

    useEffect(() => {
        if (!providerId) {
            navigate('/login/ProviderLogin'); // Redirect if not authenticated
            return;
        }

        const fetchProviderData = async () => {
            try {
                const providerRef = doc(db, 'workers', providerId);
                const providerSnap = await getDoc(providerRef);

                if (providerSnap.exists()) {
                    const data = providerSnap.data();
                    setProvider(data);
                    setIsAvailable(data.isAvailable || false);
                } else {
                    // Check if the provider's email matches one of the special email IDs
                    if (specialEmails.includes(providerEmail)) {
                        // Print mock data for special email IDs
                        console.log(`Provider not found in Firestore for email: ${providerEmail}, displaying default data.`);
                        const fullName = providerEmail === 'aaravshah@gmail.com' ? 'Aarav Shah' : 
                                         providerEmail === 'ravikumar@gmail.com' ? 'Ravi Kumar' : 
                                         providerEmail === 'poojaverma@gmail.com' ? 'Pooja Verma' : 'Mock Name';
                        const mockData = {
                            fullName: fullName,
                            username: fullName.split(' ')[0], // Extract first name for username
                            email: providerEmail,
                            phoneNumber: '1234567890',
                            service: 'Plumbing',
                            isAvailable: false
                        };
                        setProvider(mockData);
                        setIsAvailable(mockData.isAvailable);
                    } else {
                        console.error('No such provider!');
                    }
                }
            } catch (error) {
                console.error('Error fetching provider data: ', error);
            }
        };

        fetchProviderData();
    }, [providerId, providerEmail, navigate]);

    const handleAvailabilityToggle = async () => {
        try {
            const newAvailability = !isAvailable;
            setIsAvailable(newAvailability);

            const providerRef = doc(db, 'workers', providerId);
            await updateDoc(providerRef, { isAvailable: newAvailability });
        } catch (error) {
            console.error('Error updating availability: ', error);
        }
    };

    if (!provider) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-blue-500 text-white w-64 p-5 flex flex-col">
                <h1 className="text-lg font-bold mb-5">Home Care Connect</h1>
                <ul>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5">
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Provider Profile</h2>

                    <div className="mb-4">
                        <label className="block">Full Name:</label>
                        <p>{provider.fullName}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block">Username:</label>
                        <p>{provider.username}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block">Email:</label>
                        <p>{provider.email}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block">Phone Number:</label>
                        <p>{provider.phoneNumber}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block">Service:</label>
                        <p>{provider.service}</p>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <span>Availability:</span>
                        <div className="flex items-center">
                            <label>{isAvailable ? 'Available' : 'Not Available'}</label>
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={handleAvailabilityToggle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
