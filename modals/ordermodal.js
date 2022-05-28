const mongoose = require("mongoose");

// orderModel schema
const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fooditems",
            required: true,
        },
        quantity: { type: Number, required: true },

        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restarurantusers",
            required: true,
        },
        addres: {
            type: String,
            required: true,
        },
        ordermobile: { type: Number, required: true },
        orderStatus: {
            type: String,
            required: true,
            enum: ["pending", "Accepted", "Rejected"],
            default: "pending",
        },
        AcceptStatus: {
            type: String,
            required: true,
            enum: ["Accept Order", "Order Accepted"],
            default: "Accept Order",
        },
        rejectStatus: {
            type: String,
            required: true,
            enum: ["Reject Order", "Order Rejected"],
            default: "Reject Order",
        },
    },
    { timestamps: true }
);

const orderModel = new mongoose.model("orders", orderSchema);

module.exports = orderModel;
