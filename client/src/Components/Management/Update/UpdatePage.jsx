import React, { useCallback, useEffect, useState } from "react";
import "./UpdatePage.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../Config";

const UpdatePage = () => {
  const api = apiURL.url;
  const histroy = useNavigate();
  const { addFoodItemId } = useParams();
  //   console.log(addFoodItemId);

  const [sendData, setSendData] = useState({
    fname: "",
    fimg: "",
    fprice: "",
    fdec: ""
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
        // console.log("update", res);

        const updateFood = await res.data[0].find(
          (addFoodItem) => addFoodItem._id.toString() === addFoodItemId
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
  }, [api, addFoodItemId]);

  useEffect(() => {
    fetched();
  }, [fetched]);

  const updateFoodItem = async () => {
    const { fname, fimg, fprice, fdec } = sendData;
    if (!fname || !fimg || !fprice || !fdec) {
      alert("Please Enter all fields");
    } else {
      console.log("update");
      const data = await fetch(`${api}/updateFoodItem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sendData, addFoodItemId })
      });
      const res = await data.json();
      //   console.log(res);
      if (res.status === 205) {
        console.log(res);
        histroy("/management");
        window.location.reload();
      } else {
        console.log("not update data");
      }
    }
  };

  return (
    <>
      <div className="reg">
        <div className="regContainer">
          <div className="form">
            <h3>Welcome to Update Food</h3>
          </div>
          <div className="form">
            <label htmlFor="fname">Food Name</label>
            <input
              type="text"
              name="fname"
              value={sendData.fname}
              onChange={changeData}
              placeholder="Enter new Food name "
            />
          </div>
          <div className="form">
            <label htmlFor="fimg">Food Image URL</label>
            <input
              type="url"
              name="fimg"
              value={sendData.fimg}
              onChange={changeData}
              placeholder="Enter url"
            />
          </div>
          <div className="form">
            <label htmlFor="fprice">Food Price</label>
            <input
              type="number"
              name="fprice"
              value={sendData.fprice}
              onChange={changeData}
              placeholder="Enter price"
            />
          </div>
          <div className="form">
            <label htmlFor="fdec">Food Description</label>
            <textarea
              name="fdec"
              value={sendData.fdec}
              onChange={changeData}
              placeholder="Enter decription"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div className="form">
            <button onClick={updateFoodItem}>Update</button>
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

export default UpdatePage;
