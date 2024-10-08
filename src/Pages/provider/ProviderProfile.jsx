import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Home, LayoutDashboard, User, HelpCircle, LogOut } from 'lucide-react';

const ProviderProfile = () => {
    const navigate = useNavigate();
    
    const [provider, setProvider] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);

    const providerId = auth.currentUser?.uid;

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
                    console.error('No such provider!');
                }
            } catch (error) {
                console.error('Error fetching provider data: ', error);
            }
        };

        fetchProviderData();
    }, [providerId, navigate]);

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
        return <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-2xl font-semibold text-gray-600">Loading...</div>
        </div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#4B49AC] text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Home Care Connect</h2>
                </div>
                <nav className="mt-8">
                    {[
                        { name: 'Home', icon: Home, onClick: () => navigate('#') },
                        { name: 'Dashboard', icon: LayoutDashboard, onClick: () => navigate('/provider/ProviderDashboard') },
                        { name: 'Profile', icon: User, onClick: () => {} },
                        { name: 'Help', icon: HelpCircle, onClick: () => navigate('#') },
                        { name: 'Logout', icon: LogOut, onClick: () => navigate('/') }

                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            onClick={item.onClick}
                            className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#7978E9] hover:translate-x-1"
                        >
                            {item.icon && <item.icon className="mr-2" size={20} />}
                            {item.name}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 mr-20 ">Provider Profile</h2>

        <div className="space-y-4 ">
  {[
    { label: 'Full Name', value: provider.fullName },
    { label: 'Username', value: provider.username },
    { label: 'Email', value: provider.email },
    { label: 'Phone Number', value: provider.phoneNumber },
    { label: 'Service', value: provider.service }
  ].map((item, index) => (
    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-start sm:space-x-4">
      {/* Give the label a fixed width for consistent alignment */}
      <span className="text-gray-800 font-bold sm:w-40 ml-8">{item.label}:</span>
      {/* Ensure the value aligns left as well */}
      <span className="text-gray-600">{item.value}</span>
    </div>
  ))}

  <div className="flex items-center justify-start pt-4 space-x-4">
    <span className="text-gray-800 font-bold sm:w-40 ml-8">Availability:</span>
    <div className="flex items-center space-x-2">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={handleAvailabilityToggle}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      <span className="text-gray-600">{isAvailable ? 'Available' : 'Not Available'}</span>
    </div>
  </div>
</div>

                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;