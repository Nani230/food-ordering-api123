const express = require("express");

const verifytoken = require("../middlewear/verify");
const restarentverifytoken = require("../middlewear/restarentverify");
const orderModel = require("../modals/ordermodal");
const foodModel = require("../modals/fooditems");
const restaurant = require("../middlewear/Restarurent");
const usermodal = require("../modals/usersmodal");

const router = express.Router();

// add item to order
router.post("/create/:id", verifytoken, (req, res) => {
    let _id = req.params.id;
    let body = req.body;
    console.log(_id);

    usermodal
        .findOne({ _id })
        .then((data1) => {
            foodModel
                .findOne({ _id: body.foodItem })
                .then((data) => {
                    console.log(data1);

                    if (data.quantity > 0) {
                        let orderData = {
                            ordermobile: data1.ordermobile,
                            addres: data1.addres,
                            customer: body.customer,
                            foodItem: body.foodItem,
                            restaurant: body.restaurant,
                            quantity: body.quantity,
                        };
                        const orders = new orderModel(orderData);
                        console.log(orders);
                        orders
                            .save()
                            .then(async () => {
                                await foodModel.updateOne(
                                    { _id: body.foodItem },
                                    {
                                        quantity:
                                            data.quantity - orderData.quantity,
                                    }
                                );
                                res.status(200).send({
                                    message: "Ordered!!!",
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(400).send({
                                    message: "Order rejected",
                                    success: false,
                                });
                            });
                    } else {
                        res.status(400).send({
                            message: "Order rejected, Out of Stock",
                            status: false,
                        });
                    }
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => res.send(err));
});
// get user order items

router.get("/orders/:id", verifytoken, (req, res) => {
    let id = req.params.id;
    console.log(id);
    let allitems = [];

    orderModel
        .find()
        .populate("foodItem")
        .populate("customer")

        .then((data) => {
            console.log(data);
            items = data;
            items.map((data) => {
                console.log(data.customer);

                if ((data.customer._id == id) & (data.foodItem != null)) {
                    allitems.push(data);
                } else {
                    console.log("err");
                }
            });
            console.log(allitems);
            res.send(allitems);
        })
        .catch((err) => {
            console.log(err);
        });
});

// get restaurant order items
router.get("/resorders/:id", restarentverifytoken, restaurant, (req, res) => {
    let id = req.params.id;
    console.log(id);

    orderModel
        .find()
        .populate("foodItem")
        .populate("customer")

        .then((data) => {
            let allitems = [];

            items = data;
            items.map((data) => {
                console.log(data._id);

                if ((data.restaurant == id) & (data.foodItem != null)) {
                    allitems.push(data);
                } else {
                    console.log("err");
                }
            });
            console.log(allitems);
            res.send({ data: allitems });
        })
        .catch((err) => {
            console.log(err);
        });
});
// update order items
router.put(
    "/changeStatus/:id",
    restarentverifytoken,
    restaurant,
    (req, res) => {
        let _id = req.params.id;
        console.log(_id);
        let updatedOrderStatus = req.body.orderStatus;
        let AcceptStatus = req.body.AcceptStatus;
        let rejectStatus = req.body.rejectStatus;

        orderModel
            .updateOne(
                { _id },
                {
                    orderStatus: updatedOrderStatus,
                    AcceptStatus: AcceptStatus,
                    rejectStatus: rejectStatus,
                }
            )
            .then(() =>
                res.status(200).send({
                    message: "order" + updatedOrderStatus,
                    success: true,
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: `unable to change the status of order`,
                    success: false,
                });
            });
    }
);

module.exports = router;
