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


  const submitToRegister=async(e)=>{
    e.preventDefault();

    const {name, emial, password, cpassword}=sendData;
    if(!name || !emial || !password || !cpassword){
      alert("Enter all fields")
    }else if(!email.include("@")){
      alert("Enter valid email")
    }else if(password.length<6 || cpassword<6 || password!==cpassword){
      
    }
  }

  return (
    <div className="reg">
      <div className="regContainer">
        <div className="form">
          <h1>Welcome to Register</h1>
        </div>
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={sendData.name}
            onChange={changeData}
            placeholder="Enter your name"
          />
        </div>
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={sendData.email}
            onChange={changeData}
            placeholder="Enter your email"
          />
        </div>
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={sendData.password}
            onChange={changeData}
            placeholder="Enter password"
          />
        </div>
        <div className="form">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="cpassword"
            value={sendData.cpassword}
            onChange={changeData}
            placeholder="Enter confirm password"
          />
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
