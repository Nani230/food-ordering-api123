const mongoose = require("mongoose");

// restarent user schema
let schema = new mongoose.Schema({
    restaurantname: { type: String, required: true },
    address: { type: String, required: true },
    opentime: { type: String, required: true },
    closetime: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    posterurl: { type: String, required: true },
    role: { type: String, default: "restaurant", enum: "restaurant" },
});

let usermodal = new mongoose.model("restarurantuser", schema);

module.exports = usermodal;
