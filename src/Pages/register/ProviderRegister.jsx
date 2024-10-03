import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set user data
import './UserRegister.css'; // Ensure you have the correct CSS file for styling

const ProviderRegister = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
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
                role: 'provider' // Set the role to provider
            });

            // After successful registration, navigate to provider login
            alert(`Registered: ${fullName}, ${username}, ${email}`);
            navigate("/login/ProviderLogin"); // Correct navigation after registration
        } catch (error) {
            console.error("Error registering: ", error);
            alert(error.message);
        }
    };

    return (
        <div className='register-body'>
            <div className='container_register'>
                <div className='title_register'>REGISTRATION</div>
                <form onSubmit={handleSubmit}>
                    <div className='user-details'>
                        <div className='input-box'>
                            <span className='details'>Full Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>User Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your User Name'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Password</span>
                            <input
                                type="password"
                                placeholder='Enter Your Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Email</span>
                            <input
                                type="email"
                                placeholder='Enter Your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Phone Number</span>
                            <input
                                type="text"
                                placeholder='Enter Your phone number'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className='button'>
                            <input type='submit' value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProviderRegister;
