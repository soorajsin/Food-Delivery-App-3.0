const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");

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

module.exports = router;
