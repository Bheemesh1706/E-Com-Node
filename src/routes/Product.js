const router = require("express").Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const products = (await Product.find()) || [];
  res.send({ products, count: products.length }).status(200);
});

router.post("/order", async (req, res) => {
  const data = req.body;
  console.log(data);
  const { Address, User, Total, Count } = req.body;

  const ProductIds = Count.map((item) => item.Id);
  const Products = await Product.find({ _id: { $in: ProductIds } });

  const newOrder = await Order({ Total, Address, User }).save();

  const newOrderItems = await Promise.all(
    Count.map(async (item) => {
      const product = Products.find((p) => p._id == item.Id);
      const SavedOrderItem = await new OrderItem({
        OrderID: newOrder.id,
        Name: product.Name,
        Price: product.Price,
        Unit: product.Unit,
        Weight: product.Weight,
        Count: item.Count,
      });
      return SavedOrderItem;
    })
  );
  const SavedOrderItems = await OrderItem.insertMany(newOrderItems);
  console.log(SavedOrderItems);

  res.send({ sucess_message: "Order Initiated!" }).status(200);
});

router.get("/get-order", async (req, res) => {
  const token = req.query.token;
  const pageno = req.query.page;
  var current = (pageno - 1) * 2;
  console.log("get-orders");
  console.log(req.query);

  const User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(User.id);
  console.log(pageno);
  console.log(current);
  const OrderData = await Order.find({ User: User.id }).skip(current).limit(2);
  console.log(OrderData);
  if (User) {
    res.send(OrderData).status(200);
  } else {
    res.send({ error_message: "Unauthorised" }).status(401);
  }
});

router.get("/get-order-details", async (req, res) => {
  const token = req.query.token;
  const Id = req.query.Id;
  console.log("get-orders-details");
  console.log(req.query);

  const User = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(User.id);
  
  const OrderData = await OrderItem.find({ OrderID: Id });
  console.log(OrderData);

  if (User) {
    res.send(OrderData).status(200);
  } else {
    res.send({ error_message: "Unauthorised" }).status(401);
  }
});


module.exports = router;


