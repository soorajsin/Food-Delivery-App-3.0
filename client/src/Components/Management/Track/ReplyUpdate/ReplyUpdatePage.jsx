import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../../Config";

const ReplyUpdatePage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const { replyByManagementId } = useParams();
  // console.log(replyByManagementId);
  const [sendData, setSendData] = useState({
    dname: "",
    demail: "",
    dmobile: "",
    dtime: ""
  });

  const changeData = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };
  console.log(sendData);

  const buyfetched = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetched/fetchedreplyByManagementId`, {
        method: "GET"
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 203) {
        // console.log("buy", res);
        const checkId = await res.data[0].find(
          (replyByManagement) =>
            replyByManagement._id.toString() === replyByManagementId
        );
        console.log("Checked ", checkId);
        if (checkId) {
          setSendData({
            fname: checkId.fname,
            fimg: checkId.fimg,
            fprice: checkId.fprice,
            fdec: checkId.fdec,
            cname: checkId.cname,
            cmobile: checkId.cmobile,
            caddress: checkId.caddress,
            dname: checkId.dname,
            demail: checkId.demail,
            dmobile: checkId.dmobile,
            dtime: checkId.dtime
          });
        } else {
          console.log("invalid id");
        }
      } else {
        console.log("Not fetched data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api, replyByManagementId]);

  useEffect(() => {
    buyfetched();
  }, [buyfetched]);

  const submitToReply = async () => {
    const { dname, demail, dmobile, dtime } = sendData;
    if (!dname || !demail || !dmobile || !dtime) {
      alert("Please Enter all fields");
    } else {
      //   console.log("done");

      try {
        const data = await fetch(`${api}/reply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sendData })
        });
        const res = await data.json();
        console.log(res);
        // if (res.status === 206) {
        //   console.log(res);
        //   history("/track");
        //   window.location.reload();
        // } else {
        //   console.log("not reply");
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="reg">
        <div className="regContainer">
          <div className="form">
            <h1>Welcome to Reply</h1>
          </div>
          <div className="form">
            <label htmlFor="dname">Name</label>
            <br />
            <input
              type="text"
              name="dname"
              value={sendData.dname}
              onChange={changeData}
              placeholder="Enter delivery boy name"
            />
          </div>
          <div className="form">
            <label htmlFor="demail">Email</label>
            <br />
            <input
              type="email"
              name="demail"
              value={sendData.demail}
              onChange={changeData}
              placeholder="Enter delivery boy email"
            />
          </div>
          <div className="form">
            <label htmlFor="dmobile">Mobile No.</label>
            <br />
            <input
              type="tele"
              name="dmobile"
              value={sendData.dmobile}
              onChange={changeData}
              placeholder="Enter mobile no."
            />
          </div>
          <div className="form">
            <label htmlFor="dtime">Time</label>
            <br />
            <input
              type="time"
              name="dtime"
              value={sendData.dtime}
              onChange={changeData}
              placeholder="Enter dalivery time"
            />
          </div>
          <div className="form">
            <button onClick={submitToReply}>Submit</button>
          </div>
          <div className="form">
            <p>
              <NavLink to={"/track"}>Cancel</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyUpdatePage;
