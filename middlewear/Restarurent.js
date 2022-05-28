// middle wear to check it is restarent
const Restaurant = (req, res, next) => {
    let role = user.role;
    console.log(role);
    if (role === "restaurant") {
        next();
    } else {
        res.status(400).send({
            message: "Your are authorized",
            success: false,
        });
    }
};

module.exports = Restaurant;
