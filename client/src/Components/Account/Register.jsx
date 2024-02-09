import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: ""
  });

  const changeData = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };
  console.log(sendData);

  return (
    <div className="reg">
      <div className="regContainer">
        <div className="form">
          <h1>Welcome to Register</h1>
        </div>
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" placeholder="Enter password" />
        </div>
        <div className="form">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input type="password" placeholder="Enter confirm password" />
        </div>
        <div className="form">
          <button>Register</button>
        </div>
        <div className="form">
          <p>
            Already have an Account? <NavLink to="/">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
