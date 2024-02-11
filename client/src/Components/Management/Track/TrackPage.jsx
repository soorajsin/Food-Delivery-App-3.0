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

  const [reply, setReply] = useState();
  // console.log(reply);
  const replyFetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/replyfetched`, {
        method: "GET"
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 203) {
        // console.log("reply", res);
        setReply(res);
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);

  useEffect(() => {
    buyfetched();
    replyFetched();
  }, [buyfetched, replyFetched]);

  const replyPageIcon = (buyFoodId, index) => {
    history(`/reply/${buyFoodId}`);
  };

  const deletereply = async (replyByManagementId, index) => {
    try {
      const data = await fetch(`${api}/deletereply`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ replyByManagementId })
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 204) {
        console.log(res);
        window.location.reload();
      } else {
        alert("Not delte");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatereply = (replyByManagementId, index) => {
    history(`/replyUpdate/${replyByManagementId}`);
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
          <div className="space">
            <h1>Welcome to Reply</h1>
          </div>
          <div className="show">
            {reply
              ? reply.data[0].map((replyByManagement, index) => (
                  <div key={index} className="showData">
                    <img src={replyByManagement.fimg} alt="food img" />
                    <h2>{replyByManagement.fname}</h2>
                    <h3>{replyByManagement.fprice}</h3>
                    <p>{replyByManagement.fdec}</p>
                    <p>{replyByManagement.cname}</p>
                    <p>{replyByManagement.cmobile}</p>
                    <p>{replyByManagement.caddress}</p>
                    <p>-----------------------------------</p>
                    <p>{replyByManagement.dname}</p>
                    <p>{replyByManagement.demail}</p>
                    <p>{replyByManagement.dmobile}</p>
                    <p>{replyByManagement.dtime}</p>
                    <div className="actionCon">
                      <>
                        <i
                          onClick={() =>
                            deletereply(replyByManagement._id, index)
                          }
                          className="fa-solid fa-delete-left"
                        ></i>
                        <i
                          onClick={() =>
                            updatereply(replyByManagement._id, index)
                          }
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

export default TrackPage;
