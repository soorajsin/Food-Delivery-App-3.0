const express = require("express");
const app = express();
require("./DB/Conntection");
const cors = require("cors");
const router = require("./Routes/Route");
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(400).json({
    msg: "Server started"
  });
});

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
