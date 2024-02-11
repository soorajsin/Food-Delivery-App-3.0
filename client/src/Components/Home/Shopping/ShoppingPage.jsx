import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../../Config";

const ShoppingPage = () => {
  const api = apiURL.url;
  const [userData, setUserData] = useState();
  console.log(userData);
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
                      <></>
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

export default ShoppingPage;
