const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: "", room: "", email: "", password: "" };

    // incorrect email (login)
    if (err.message === "incorrect email") {
        errors.email = "that email is not registered";
    }

    // incorrect password (login)
    if (err.message === "incorrect password") {
        errors.password = "that password is incorrect";
    }

    // duplicate error code
    if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        const val = Object.values(err.keyValue)[0];
        console.log(key, val);
        console.log(key == "room", key == "email");
        switch (key) {
            case "name":
                errors.name = "the name associated with this account is already registered";
                break;
            case "room":
                errors.room = "the room associated with this account is already registered";
                break;    
            case "email":
                errors.email = "the email associated with this account is already registered";
                break;
            default:
                errors.name = "the name associated with this account is already registered";
                errors.room = "the room associated with this account is already registered";
                errors.email = "the email associated with this account is already registered";
        }
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};

// create jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;  // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, "eusoff app secret", {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { name, room, email, password, credit } = req.body;
    
    try {
        const user = await User.create({ name, room, email, password, credit });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");
};