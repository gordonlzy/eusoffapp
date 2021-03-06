const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, "eusoff app secret", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.redirect("/login");
                res.json({ jwt_result: "failed" })
            } else {
                // console.log(decodedToken);
                next();
            }
        });
    } else {
        res.json({ jwt_result: "failed" })
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "eusoff app secret", async (err, decodedToken) => {
            if (err) {
                // console.log(err.message);
                // res.locals.user = null;
                req.verifiedUser = null;
                next();
            } else {
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                // res.locals.user = user;
                req.verifiedUser = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };