import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../../Config";
import "./ShoppingPage.css";
import { useNavigate } from "react-router-dom";

const ShoppingPage = () => {
  const api = apiURL.url;
  const histroy = useNavigate();
  const [userData, setUserData] = useState();
  // console.log(userData);
  const fetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedToCart`, {
        method: "GET"
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 202) {
        // console.log("cart", res);
        setUserData(res);
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  const [buy, setBuy] = useState();
  // console.log(buy);
  const buyfetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedToBuy`, {
        method: "GET"
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 203) {
        // console.log("buy", res);
        setBuy(res);
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  useEffect(() => {
    fetched();
    buyfetched();
  }, [fetched, buyfetched]);

  const deleteCart = async (addToCartId, index) => {
    try {
      // const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/deleteToCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
          // Authorization: token
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

  const cancelFood = async (buyFoodId, index) => {
    try {
      const data = await fetch(`${api}/cancelFood`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ buyFoodId })
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 209) {
        console.log(res);
        window.location.reload();
      } else {
        alert("Product not cancel");
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
              ? userData.data[0].map((addToCart, index) => (
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
          <div className="show">
            {buy
              ? buy.data[0].map((buyFood, index) => (
                  <div key={index} className="showData">
                    <img src={buyFood.fimg} alt="food img" />
                    <h2>{buyFood.fname}</h2>
                    <h3>{buyFood.fprice}</h3>
                    <p>{buyFood.fdec}</p>
                    <p>{buyFood.cname}</p>
                    <p>{buyFood.cmobile}</p>
                    <p>{buyFood.caddress}</p>
                    <div className="actionCon">
                      <>
                        <i
                          onClick={() => cancelFood(buyFood._id, index)}
                          className="fa-solid fa-ban"
                        ></i>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="space">
            <h1>Welcome to Reply [Time & Date]</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;
