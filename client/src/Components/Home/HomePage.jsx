import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../Config";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const api = apiURL.url;
  const history = useNavigate();
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

  const addToCart = async (addFoodItemId, index) => {
    try {
      const data = await fetch(`${api}/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ addFoodItemId })
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 206) {
        console.log(res);
        history("/shopping");
      } else {
        alert("Not add To Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="management">
        <div className="magCon">
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
                          onClick={() => addToCart(addFoodItem._id, index)}
                          className="fa-solid fa-cart-plus"
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

export default HomePage;
