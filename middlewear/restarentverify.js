const jwt = require("jsonwebtoken");

// middle wear to verify token
const restarentverify = (req, res, next) => {
    if (req.headers.authorization != undefined) {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);

        jwt.verify(token, "reskey", (err, userbody) => {
            if (err === null) {
                user = userbody;
                console.log(userbody);
                next();
            } else {
                res.status(401).send({ massage: "Invalid Token" });
            }
        });
    } else {
        res.status(403).send({ massage: "Please Authicate" });
    }
};

module.exports = restarentverify;
