import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../../Config";

const BuyPage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const { addToCartId } = useParams();
  //   console.log(addToCartId);
  const [sendData, setSendData] = useState({
    cname: "",
    cmobile: "",
    caddress: ""
  });

  const changeData = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };
  console.log(sendData);

  const fetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedToAll`, {
        method: "GET"
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 202) {
        console.log("update", res);

        const updateFood = await res.data[0].find(
          (addToCart) => addToCart._id.toString() === addToCartId
        );
        // console.log("matched", updateFood);
        if (updateFood) {
          setSendData({
            fname: updateFood.fname,
            fimg: updateFood.fimg,
            fprice: updateFood.fprice,
            fdec: updateFood.fdec
          });
        } else {
          console.log("not matched data");
        }
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api, addToCartId]);

  useEffect(() => {
    fetched();
  }, [fetched]);

  const productBuy = async () => {
    const { cname, cmobile, caddress } = sendData;
    if (!cname || !cmobile || !caddress) {
      alert("Enter all fields");
    } else {
      console.log("done");
      const data = await fetch(`${api}/buyFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sendData })
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 208) {
        console.log(res);
        history("/shopping");
        window.location.reload();
      } else {
        alert("Not Buy Food");
      }
    }
  };

  return (
    <div className="reg">
      <div className="regContainer">
        <div className="form">
          <h2>Welcome to Buy Food</h2>
        </div>
        <div className="form">
          <label htmlFor="cname">Name</label>
          <br />
          <input
            type="text"
            name="cname"
            value={sendData.cname}
            onChange={changeData}
            placeholder="Enter name"
          />
        </div>
        <div className="form">
          <label htmlFor="cmobile">Mobile No.</label>
          <br />
          <input
            type="tele"
            name="cmobile"
            value={sendData.cmobile}
            onChange={changeData}
            placeholder="Enter mobile no."
          />
        </div>
        <div className="form">
          <label htmlFor="caddress">Address</label>
          <br />
          <textarea
            name="caddress"
            value={sendData.caddress}
            onChange={changeData}
            placeholder="Enter address"
            cols="30"
            rows="2"
          ></textarea>
        </div>
        <div className="form">
          <button onClick={productBuy}>Submit</button>
        </div>
        <div className="form">
          <p>
            {" "}
            <NavLink to={"/shopping"}>Cancel</NavLink>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
