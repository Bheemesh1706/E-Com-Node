const router = require("express").Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");
const jwt = require("jsonwebtoken");

router.get("/", async(req,res)=>{
    const products = await Product.find() || [] ;
    res.send({products,count:products.length}).status(200);
})

router.post("/order", async(req,res)=>{
        const data = req.body;
        const {address,cart,Id,Total} = req.body;
        console.log(address.Address);
        console.log(cart);
        console.log(Id);
        console.log(Total);

        const newOrder = Order({Total,Address:address.Address,User: Id});
        const saveOrder = await newOrder.save();

        const newOrderItem = OrderItems({OrderID:saveOrder.id,Items:cart});
        const saveOrderItem = await newOrderItem.save();

        res.send({"sucess_message":"Order Initiated!"}).status(200);
})

router.get("/get-order", async(req,res)=>{
  const token = req.query.token;
  const User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(User.id);
  const OrderList = await Order.find({User: User.id})
  console.log(OrderList);
  res.send({}).status(200);
})
module.exports = router;