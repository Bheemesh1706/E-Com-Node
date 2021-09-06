const mongoose = require("mongoose");

const schemaCart = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Weight: {
        type: String,
        required: true
    },
    Unit: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Cart", schemaCart);