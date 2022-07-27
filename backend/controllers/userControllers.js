
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc            Register
//@route           POST   /api/users/
//@access          Public

exports.register = asyncHandler(async (req, res, next) => {

    let {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let userExists = await User.findOne({ email: email});

    if (userExists) {
        res.status(400)
        throw new Error("User exists already!")
    };

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }

});

//@desc           Login
//@route          POST /api/users/
//@access         Public

exports.login = asyncHandler(async (req, res, next) => {

    let {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill enough information!")
    }

    let user = await User.findOne({ email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Not Authorized!");
    }
    
});

let generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};


exports.getMe = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);
});

