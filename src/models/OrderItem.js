const mongoose = require("mongoose");

const schemaOrderItem = new mongoose.Schema({
  OrderID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Unit: {
    type: Number,
    required: true,
  },
   Weight: {
    type: String,
    required: true,
  },
  Count: { type: Number, required: true },
  
});

module.exports = mongoose.model("OrderItem", schemaOrderItem);
