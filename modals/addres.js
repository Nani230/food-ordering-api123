const mongoose = require("mongoose");

// user schema
const schema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    ordermobile: { type: Number, required: true, unique: true },
    addres: { type: String, required: true },
});

let usermodal = new mongoose.model("addres", schema);

module.exports = usermodal;
