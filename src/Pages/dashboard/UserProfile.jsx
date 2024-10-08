import React, { useState, useEffect } from 'react';
import { Home, HelpCircle, User, LogOut } from 'lucide-react';
import pic from "../../images/pic.jpeg"; // Profile picture
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = ({ toggleProfile }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for user data
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true); // Start loading
            if (user) {
                await fetchUserData(user);
            } else {
                setUserData(null); // Clear user data when logged out
            }
            setLoading(false); // End loading
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, []);

    const fetchUserData = async (user) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.error("User not found in Firestore.");
                setUserData(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null); // Clear data on error
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-[#4B49AC] text-white">
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
                                if (index === 4) toggleProfile();
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

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col items-center">
                        <img src={pic} alt="profile" className="w-32 h-32 rounded-full border-4 border-[#4B49AC] mb-6" />
                        <div className="text-center">
                            {loading ? ( // Loading state
                                <p className="text-gray-600">Loading user data...</p>
                            ) : userData ? (
                                <>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userData.fullName}</h2>
                                    <p className="text-gray-600 mb-1">Email: {userData.email}</p>
                                    <p className="text-gray-600 mb-1">Username: {userData.username}</p>
                                    <p className="text-gray-600 mb-1">Location: {userData.location}</p>
                                    <p className="text-gray-600">Phone Number: {userData.phoneNumber}</p>
                                </>
                            ) : (
                                <p className="text-gray-600">No user data found.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
