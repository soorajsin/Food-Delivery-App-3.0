import React from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const history = useNavigate();
  const addFoodPage = () => {
    history("/add");
  };
  return (
    <>
      <div className="management">
        <div className="magCon">
          <div className="add">
            <button onClick={addFoodPage}>ADD NEW FOOD</button>
          </div>
          <div className="show">d</div>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
