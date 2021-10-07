const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const router = express.Router();
const cors = require("cors");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/Product");
const Update = require("./src/Script/update");



mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connect to DB!");
  Update();
});



app.use(express.json());
router.use("/auth",userRouter)
router.use("/product",productRouter)
app.use(cors());
app.use("/api", router);


app.listen(3001, () => {
  console.log("Server Started");
});