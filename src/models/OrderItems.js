const mongoose = require("mongoose");

const schemaOrderItems = new mongoose.Schema({
  OrderID: {
    type: String,
    required: true,
  },
  Items: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("OrderItems", schemaOrderItems);
