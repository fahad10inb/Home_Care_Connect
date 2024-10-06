import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set user data
//import './ProviderRegister.css'; // Ensure you have the correct CSS file for styling

const ProviderRegister = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [service, setService] = useState(''); // Default blank for services

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                service: service, // Storing service
                role: 'provider' // Set the role to provider
            });

            // After successful registration, navigate to provider login
            alert(`Registered: ${fullName}, ${username}, ${email}, ${service}`);
            navigate("/login/ProviderLogin"); // Correct navigation after registration
        } catch (error) {
            console.error("Error registering: ", error);
            alert(error.message);
        }
    };

    return (
        <div className='register-body bg-blue h-screen flex items-center justify-center'>
           <div className='container_register bg-white p-8 rounded-1g border-8 border-[#4B49AC] shadow-lg w-full max-w-2xl mt-5 pt-6'>

                <div className='title_register text-2xl font-bold text-[#4B49AC] mb-4 text-center'>PROVIDER--REGISTRATION</div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='user-details grid grid-cols-2 gap-4'>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>Full Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>User Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your User Name'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>Password</span>
                            <input
                                type="password"
                                placeholder='Enter Your Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>Email</span>
                            <input
                                type="email"
                                placeholder='Enter Your Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>Phone Number</span>
                            <input
                                type="text"
                                placeholder='Enter Your Phone Number'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details block text-sm font-medium text-gray-700'>Service</span>
                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                className='input w-full p-2 border border-gray-300 rounded-md'
                                placeholder="Enter your service"
                            >
                                <option value="" disabled>Enter your service</option>
                                <option value="cleaning">Cleaning</option>
                                <option value="plumbing">Plumbing</option>
                                <option value="electricity">Electricity</option>
                            </select>
                        </div>
                    </div>
                    <div className='button mt-4 h-12 flex justify-center items-center'>
    <input
        type='submit'
        value="Register"
        className='w-full h-full bg-[#4B49AC] text-white rounded-md hover:bg-[#7978E9] hover:shadow-lg transition-all duration-300 flex justify-center items-center'
    />
</div>

                </form>
            </div>
        </div>
    );
}

export default ProviderRegister;
