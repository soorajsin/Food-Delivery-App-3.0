import React, { useCallback, useEffect } from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../Config";
import { useState } from "react";

const ManagementPage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const addFoodPage = () => {
    history("/add");
  };

  const [userData, setUserData] = useState();
  // console.log("user ", userData);
  const fetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedToAll`, {
        method: "GET"
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 202) {
        // console.log(res);
        setUserData(res);
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  useEffect(() => {
    fetched();
  }, [fetched]);

  const deleteFood = async (addFoodItemId, index) => {
    try {
      // const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/deleteaddFoodItem`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
          // Authorization: token
        },
        body: JSON.stringify({ addFoodItemId })
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 204) {
        console.log(res);
        window.location.reload();
      } else {
        alert("Not delete data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateFood = async (addFoodItemId, index) => {
    history(`/update/${addFoodItemId}`);
  };

  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="add">
            <button onClick={addFoodPage}>ADD NEW FOOD</button>
          </div>
          <div className="show">
            {userData
              ? userData.data[0].map((addFoodItem, index) => (
                  <div key={index} className="showData">
                    <img src={addFoodItem.fimg} alt="food img" />
                    <h2>{addFoodItem.fname}</h2>
                    <h3>{addFoodItem.fprice}</h3>
                    <p>{addFoodItem.fdec}</p>
                    <div className="actionCon">
                      <>
                        <i
                          onClick={() => deleteFood(addFoodItem._id, index)}
                          className="fa-solid fa-delete-left"
                        ></i>
                        <i
                          onClick={() => updateFood(addFoodItem._id, index)}
                          className="fa-solid fa-pen-nib"
                        ></i>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
