import React, { useState } from "react";
import "./AddFoodPage.css";
import { NavLink } from "react-router-dom";
import apiURL from "../../Config";

const AddFoodPage = () => {
  const api = apiURL.url;
  const [sendData, setSendData] = useState([
    {
      fname: "",
      fimg: "",
      fprice: "",
      fdec: ""
    }
  ]);

  const addFoodForm = () => {
    const newForm = {
      fname: "",
      fimg: "",
      fprice: "",
      fdec: ""
    };
    setSendData([...sendData, newForm]);
  };
  console.log(sendData);

  const submitToAdd = async () => {
    const emptyField = sendData.some(
      (form) => !form.fname || !form.fimg || !form.fprice || !form.fdec
    );
    if (emptyField) {
      alert("Please Enter All Fields");
    } else {
      try {
        const token = await localStorage.getItem("token");
        const data = await fetch(`${api}/addFoodItem`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify(sendData)
        });
        const res = await data.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="reg">
        <div className="regContainer">
          <div className="form">
            <h2>Welcome to Add Food</h2>
          </div>
          {sendData.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="fname">Food Name</label>
                <input
                  type="text"
                  value={sendData.fname}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].fname = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter food name"
                />
              </div>
              <div className="form">
                <label htmlFor="fimg">Food Image URL</label>
                <input
                  type="url"
                  value={sendData.fimg}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].fimg = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter food img url"
                />
              </div>
              <div className="form">
                <label htmlFor="fprice">Food Price</label>
                <input
                  type="number"
                  value={sendData.fprice}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].fprice = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter food price"
                />
              </div>
              <div className="form">
                <label htmlFor="fdec">Food Description</label>
                <br />
                <textarea
                  value={sendData.fdec}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].fdec = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter food description"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form">
                <div className="line"></div>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addFoodForm}>ADD</button>
          </div>
          <div className="form">
            <button onClick={submitToAdd}>Submit</button>
          </div>
          <div className="form">
            <p>
              <NavLink to={"/management"}>Cancel</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFoodPage;
