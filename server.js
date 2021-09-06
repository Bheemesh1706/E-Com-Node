const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const jwt = require("jsonwebtoken");
const router = express.Router();
const userRouter = require("./src/routes/user")

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connect to DB!");
});

app.use(express.json());

app.listen(3001, () => {
  console.log("Server Started");
});

router.use("/register",userRouter)
app.use("/api", router);


