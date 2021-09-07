const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const router = express.Router();
const userRouter = require("./src/routes/user")

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connect to DB!");
});

app.use(express.json());

router.use("/auth",userRouter)

app.use("/api", router);


app.listen(3001, () => {
  console.log("Server Started");
});