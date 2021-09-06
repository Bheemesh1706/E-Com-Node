const mongoose = require("mongoose");
const extendDate = require("../utils/extendDate");

const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  ...extendDate,
});

module.exports = mongoose.model("User", schemaUser);
