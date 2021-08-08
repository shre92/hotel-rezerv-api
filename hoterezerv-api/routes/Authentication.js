const Users = require('../models/Users');
const jwt = require("jsonwebtoken");
const router = require('express').Router();
require('dotenv').config()

router.post("/register",async (req,res) => {
    const user = new Users({
        useUsername: req.body.useUsername,
        usePassword: req.body.usePassword,
        useFirstname: req.body.useFirstname,
        useLastname: req.body.useLastname,
        useEmail: req.body.useEmail,
        useMobile: req.body.useMobile,
        useIsAdmin: req.body.useIsAdmin
    });
    const addedUser = await user.save();
    res.send(addedUser);
})

router.post("/login",async (req,res) => {
    const user = await Users.find({useUsername: req.body.useUsername, usePassword: req.body.usePassword});
    if(user.length > 0){
        const userJson = { useUsername: user[0].useUsername, useFirstname: user[0].useFirstname, useLastname: user[0].useLastname, useIsAdmin: user[0].useIsAdmin};
        const accessToken = jwt.sign(userJson, process.env.ACCESS_TOKEN_SECRET,{expiresIn:60 * 60});
        res.json({token : accessToken});
    }
    else{
        res.sendStatus(403);
    }
})

module.exports = router;