import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../../Config";
import { useNavigate } from "react-router-dom";

const TrackPage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const [buy, setBuy] = useState();
  console.log(buy);
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
    buyfetched();
  }, [buyfetched]);

  const replyPageIcon = (buyFoodId, index) => {
    history(`/reply/${buyFoodId}`);
  };

  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="show">
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
                            onClick={() => replyPageIcon(buyFood._id, index)}
                            className="fa-solid fa-reply"
                          ></i>
                        </>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
