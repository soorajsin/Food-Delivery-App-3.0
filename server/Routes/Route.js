const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/authentication");

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, cpassword, role } = req.body;
    if (!name || !email || !password || !cpassword || !role) {
      res.status(400).json({
        error: "All fields are required"
      });
    } else {
      const checkUser = await userdb.findOne({ email });
      if (checkUser) {
        res.status(400).json({
          status: 201,
          message: "Email is already registered!"
        });
      } else {
        // console.log("done");
        const newForm = new userdb({
          name,
          email,
          password,
          cpassword,
          role
        });

        const updatedUser = await newForm.save();
        res.status(201).json({
          status: 202,
          data: updatedUser,
          msg: "Registered successfully done"
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      msg: "Registration failed"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        msg: "Please fill the all Fields"
      });
    } else {
      const checkUser = await userdb.findOne({ email });
      if (!checkUser) {
        res.status(400).json({
          msg: "user not found",
          status: 201
        });
      } else {
        const checkPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        // console.log(checkPassword);
        if (!checkPassword) {
          res.status(400).json({
            msg: "password not found",
            status: 202
          });
        } else {
          // console.log(checkPassword);
          const token = await checkUser.generateToken();
          // console.log(token);

          //generate cookie
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
          });

          const result = { token, checkUser };
          res.status(400).json({
            status: 203,
            msg: "User Login succesfully done",
            data: result
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to login",
      error: error
    });
  }
});

router.get("/validator", authentication, async (req, res) => {
  try {
    // console.log("auth");
    if (req.getData) {
      res.status(201).json({
        msg: "User authorised",
        status: 201,
        data: req.getData
      });
    } else {
      res.status(201).json({
        msg: "user not authorised",
        status: 202
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      msg: "authentication failed"
    });
  }
});

router.post("/signOut", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const user = req.getData;
    if (!user) {
      res.status(400).json({
        msg: "user not found"
      });
    } else {
      user.tokens = [];
      const updatedUser = await user.save();
      res.status(201).json({
        status: 203,
        msg: "Successfully log Out user",
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "User failed to log Out"
    });
  }
});

router.post("/addFoodItem", async (req, res) => {
  try {
    const { sendData } = req.body;
    if (!sendData) {
      res.status(400).json({
        msg: "plz fill add fields"
      });
    } else {
      // console.log(sendData);
      const fetched = await userdb.find({});
      // console.log(fetched);
      // Extract the addFoodItem array from each user document and push new data
      const updatedUser = await Promise.all(
        fetched.map(async (user) => {
          user.addFoodItem.push(...sendData);
          return await user.save();
        })
      );

      // console.log(updatedUser);
      res.status(201).json({
        msg: "successfully food item added",
        status: 201,
        data: updatedUser.map((user) => user.addFoodItem)
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      msg: "failed to add Food"
    });
  }
});

router.get("/fetchedToAll", async (req, res) => {
  try {
    const fetched = await userdb.find({});
    const addFood = fetched.map((user) => user.addFoodItem);
    // console.log(addFood);
    res.status(201).json({
      msg: "fetched data",
      status: 202,
      data: addFood
    });
  } catch (error) {
    res.status(400).json({
      msg: "Failed to fetched",
      error: error
    });
  }
});

module.exports = router;
