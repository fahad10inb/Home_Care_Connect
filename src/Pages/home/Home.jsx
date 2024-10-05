import React from 'react';
import '../home/Home.css';
import logo from "../../images/logo.jpeg";
import pic from "../../images/pic.jpeg";
import {useNavigate} from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="navbar">
        <img src={logo} alt="Logo" />
      </div>
      <div className="content">
        <div className="left_content">
          <h1>Home Care Connect</h1>
          <p>
            Are household works worrying you? Fret not!!<br />
            We offer home services to help you out!!
          </p>
          <div className="btn">
            <a href="/choose" >Get Started</a>
          </div>
        </div>
        <div className="right_content">
          <img src={pic} alt="Home Services" />
        </div>
      </div>
    </div>
  );
};

export default Home;