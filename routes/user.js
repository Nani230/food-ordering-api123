const express = require("express");
const bcrypt = require("bcryptjs");
const rout = express.Router();
const jwt = require("jsonwebtoken");
const verifytoken = require("../middlewear/verify");
const items = require("../modals/fooditems");
const usermodal = require("../modals/usersmodal");
const cartMOdel = require("../modals/cart");

// user register

rout.post("/register", async (req, res) => {
    let userData = req.body;
    console.log(userData);

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt
        .hash(userData.password, salt)
        .catch((err) => {
            console.log(err);
        });

    userData.password = hashedpassword;

    const users = await new usermodal(userData);

    users
        .save()
        .then(() => {
            res.status(201).send({ message: "User created!!!", success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                massage: "Unable to create user",
                success: false,
            });
        });
});

// user login

rout.post("/login", async (req, res) => {
    let userCred = req.body;
    console.log(userCred);

    const user = await usermodal.findOne({ email: userCred.email });

    if (user == null) {
        res.status(403).send({
            massage: "Unable to find user",
            success: false,
        });
    } else {
        const passwordStatus = await bcrypt.compare(
            userCred.password,
            user.password
        );

        if (passwordStatus) {
            const token = await jwt.sign(userCred, "key");

            res.send({
                message: "welcome user",
                token: token,
                _id: user._id,
                name: user.name,
                success: true,
                role: "user",
            });
        } else if (!passwordStatus) {
            res.status(401).send({
                message: "incorrect password",
                success: false,
            });
        }
    }
});

// get all orders

rout.get("/myorders/:id", verifytoken, (req, res) => {
    let customerid = req.params.id;
    const orders = orderModel
        .find({ customer: customerid })
        .populate("customer")
        .populate("restaurant")
        .populate("foodItem");

    res.status(200).send(orders);
});
// get all cart items
rout.get("/mycart/:id", verifytoken, (req, res) => {
    let customerid = req.params.id;

    const cartItems = cartMOdel
        .find({ customer: customerid })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    res.status(200).send(cartItems);
});

module.exports = rout;
