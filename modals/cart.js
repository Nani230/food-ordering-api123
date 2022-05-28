const mongoose = require("mongoose");

// cart schema
const cartSchema = new mongoose.Schema(
    {
        foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fooditems",
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restarurantusers",
            required: true,
        },
        quantity: { type: Number, min: 1, required: true, default: 1 },
    },
    { timestamps: true }
);

const cartModel = new mongoose.model("cart", cartSchema);

module.exports = cartModel;
