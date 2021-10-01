const mongoose = require("mongoose");

const schemaOrderItems = new mongoose.Schema({
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
  Count: { type: Number, required: true },
  
});

module.exports = mongoose.model("OrderItems", schemaOrderItems);
