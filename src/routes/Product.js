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

        // const newOrder = Order({Total,Address:address.Address,User: Id});
        // const saveOrder = await newOrder.save();

        // const newOrderItem = OrderItems({OrderID:saveOrder.id});
        // const saveOrderItem = await newOrderItem.save();

        res.send({"sucess_message":"Order Initiated!"}).status(200);
})

router.get("/get-order", async(req,res)=>{
  const token = req.query.token;
  const pageno = req.query.page;
  var current = (pageno-1)*2;
  console.log("get-orders");
  console.log(req.query);

  const User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(User.id);
  console.log(pageno);
  console.log(current);
  const OrderData = await Order.find({User: User.id}).skip(0).limit(2);
  console.log(OrderData);
  if(User)
  {res.send(OrderData).status(200);}
  else{
    res.send({"error_message":"Unauthorised"}).status(401);
  }

})

router.get("/get-order-details", async (req, res) => {
  const token = req.query.token;
  const Id = req.query.Id;
  console.log("get-orders-details");
  console.log(req.query);

  const User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(User.id);
  console.log(pageno);
  console.log(current);
  const OrderData = await OrderItems.find({ OrderID: Id });
  
  console.log(OrderData);
  if (User) {
    res.send(OrderData).status(200);
  } else {
    res.send({ error_message: "Unauthorised" }).status(401);
  }
});
module.exports = router;