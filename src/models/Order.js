const mongoose = require('mongoose');

const schemaOrder = new mongoose.Schema({
  Total: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  User: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Order", schemaOrder);