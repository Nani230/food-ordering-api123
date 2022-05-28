const mongoose = require("mongoose");

// food items schema
const schema = new mongoose.Schema(
    {
        itemname: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        posterurl: { type: String, required: true },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restarurantuser",
        },
    },
    { timestamps: true }
);

let usermodal = new mongoose.model("fooditems", schema);

module.exports = usermodal;
