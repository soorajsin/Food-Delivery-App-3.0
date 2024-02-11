import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../../Config";
import "./ShoppingPage.css";
import { useNavigate } from "react-router-dom";

const ShoppingPage = () => {
  const api = apiURL.url;
  const histroy = useNavigate();
  const [userData, setUserData] = useState();
  // console.log(userData);
  const navAuth = useCallback(async () => {
    try {
      const token = await localStorage.getItem("token");
      // console.log(token);
      const data = await fetch(`${api}/validator`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 201) {
        // console.log(res);
        setUserData(res);
      } else if (res.status === 202) {
        console.log("user not authorized");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);
  useEffect(() => {
    navAuth();
  }, [navAuth]);

  const deleteCart = async (addToCartId, index) => {
    try {
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/deleteToCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ addToCartId })
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 207) {
        console.log(res);
        window.location.reload();
      } else {
        alert("Not Delete Food Item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyFoodItem = async (addToCartId, index) => {
    histroy(`/buyFood/${addToCartId}`);
  };
  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="show">
            {userData
              ? userData.data.addToCart.map((addToCart, index) => (
                  <div key={index} className="showData">
                    <img src={addToCart.fimg} alt="food img" />
                    <h2>{addToCart.fname}</h2>
                    <h3>{addToCart.fprice}</h3>
                    <p>{addToCart.fdec}</p>
                    <div className="actionCon">
                      <>
                        <i
                          onClick={() => deleteCart(addToCart._id, index)}
                          className="fa-solid fa-trash"
                        ></i>
                        <i
                          onClick={() => buyFoodItem(addToCart._id, index)}
                          className="fa-solid fa-cart-shopping"
                        ></i>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="space">
            <h1>Welcome to Buy Food</h1>
          </div>
          <div className="show"></div>
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;
