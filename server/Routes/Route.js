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

router.delete("/deleteaddFoodItem", async (req, res) => {
  try {
    // console.log(req.body);
    const { addFoodItemId } = req.body;
    if (!addFoodItemId) {
      res.status(400).json({
        msg: "not find id"
      });
    } else {
      const user = await userdb.findOne({});
      const index = user.addFoodItem.find(
        (addFoodItem) => addFoodItem._id.toString() === addFoodItemId
      );
      if (index === -1) {
        return res.status(404).json({
          msg: "Food item not found"
        });
      } else {
        // Remove the found food item from the array
        user.addFoodItem.splice(index, 1);

        // Save the updated user document
        await user.save();

        res.status(201).json({
          msg: "Food item deleted successfully",
          status: 204,
          data: user
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to delete",
      error: error
    });
  }
});

router.put("/updateFoodItem", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, addFoodItemId } = req.body;
    if (!sendData || !addFoodItemId) {
      res.status(400).json({
        msg: "plz fill all fields"
      });
    } else {
      const user = await userdb.findOne({});
      // console.log(user);
      const index = await user.addFoodItem.findIndex(
        (addFoodItem) => addFoodItem._id.toString() === addFoodItemId
      );
      if (index === -1) {
        res.status(400).json({
          msg: "Invalid index"
        });
      } else {
        // console.log(index);
        user.addFoodItem[index].fname = sendData.fname;
        user.addFoodItem[index].fimg = sendData.fimg;
        user.addFoodItem[index].fprice = sendData.fprice;
        user.addFoodItem[index].fdec = sendData.fdec;

        const updatedUser = await user.save();
        // console.log(updatedUser);
        res.status(201).json({
          msg: "succesfully updated",
          status: 205,
          data: updatedUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to update",
      error: error.message
    });
  }
});

router.post("/addToCart", async (req, res) => {
  try {
    // console.log(req.body);
    const { addFoodItemId } = req.body;
    if (!addFoodItemId) {
      res.status(400).json({
        msg: "addFoodItemId not found"
      });
    } else {
      const user = await userdb.findOne({});
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        const entryFields = user.addFoodItem.find(
          (addFoodItem) => addFoodItem._id.toString() === addFoodItemId
        );
        if (!entryFields) {
          res.status(400).json({
            msg: "Invalid id"
          });
        } else {
          // console.log(entryFields);
          user.addToCart.push(entryFields);

          const updatedUser = await user.save();
          res.status(201).json({
            msg: "add to cart success",
            status: 206,
            data: updatedUser
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to addToCart",
      error: error.message
    });
  }
});

router.get("/fetchedToCart", async (req, res) => {
  try {
    const fetched = await userdb.find({});
    const addFood = fetched.map((user) => user.addToCart);
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

router.delete("/deleteToCart", async (req, res) => {
  try {
    // console.log(req.body);
    const { addToCartId } = req.body;
    if (!addToCartId) {
      res.status(400).json({
        msg: "not find addToCartId"
      });
    } else {
      const user = await userdb.findOne({});
      const index = user.addToCart.find(
        (addToCart) => addToCart._id.toString() === addToCartId
      );
      if (index === -1) {
        return res.status(404).json({
          msg: "Food item not found"
        });
      } else {
        // Remove the found food item from the array
        user.addToCart.splice(index, 1);

        // Save the updated user document
        await user.save();

        res.status(201).json({
          msg: "Food item deleted successfully",
          status: 207,
          data: user
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "failed to delete"
    });
  }
});

router.post("/buyFood", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData } = req.body;
    if (!sendData) {
      res.status(400).json({
        msg: "sendData not found"
      });
    } else {
      const user = await userdb.findOne({});
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        user.buyFood.push(sendData);
        const updatedUser = await user.save();
        // console.log(updatedUser);
        res.status(201).json({
          msg: "buyFood succesfully done",
          status: 208,
          data: updatedUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to buy"
    });
  }
});

router.get("/fetchedToBuy", async (req, res) => {
  try {
    const fetched = await userdb.find({});
    const addFood = fetched.map((user) => user.buyFood);
    console.log(addFood);
    res.status(201).json({
      msg: "fetched data",
      status: 203,
      data: addFood
    });
  } catch (error) {
    res.status(400).json({
      msg: "Failed to fetched",
      error: error
    });
  }
});

router.delete("/cancelFood", async (req, res) => {
  try {
    // console.log(req.body);
    const { buyFoodId } = req.body;
    if (!buyFoodId) {
      res.status(400).json({
        msg: "buyFoodId not found"
      });
    } else {
      const user = await userdb.findOne({});
      const index = user.buyFood.find(
        (buyFood) => buyFood._id.toString() === buyFoodId
      );
      if (index === -1) {
        res.status(400).json({
          msg: "Invalid index"
        });
      } else {
        user.buyFood.splice(index, 1);
        const updatedUser = await user.save();
        res.status(201).json({
          msg: "successfully cancel food",
          status: 209,
          data: updatedUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "failed to cancel"
    });
  }
});

router.post("/reply", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData } = req.body;
    if (!sendData) {
      res.status(400).json({
        msg: "data not found"
      });
    }else{
      
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to reply"
    });
  }
});

module.exports = router;
