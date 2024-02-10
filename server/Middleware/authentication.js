const jwt = require("jsonwebtoken");
const userdb = require("../Model/userSchema");
const keysecret = "kjhgfdscxvzmskjskshdndjssjdks";

const authentication = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    // console.log(token);
    if (!token) {
      res.status(400).json({
        msg: "token not found"
      });
    } else {
      const tokenVerify = await jwt.verify(token, keysecret);
      //   console.log(tokenVerify);
      if (!tokenVerify) {
        res.status(400).json({
          msg: "Token not verified"
        });
      } else {
        const getData = await userdb.findOne({ _id: tokenVerify._id });
        // console.log(getData);
        if (!getData) {
          res.status(400).json({
            msg: "user not found"
          });
        } else {
          req.getData = getData;
          next();
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to auth",
      error: error
    });
  }
};

module.exports = authentication;
