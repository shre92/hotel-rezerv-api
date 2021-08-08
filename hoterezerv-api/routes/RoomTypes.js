const RoomTypes = require('../models/RoomTypes');
const jwt = require("jsonwebtoken");
const router = require('express').Router();
require('dotenv').config()

router.get("/",async (req,res) => {
    const roomTypes = await RoomTypes.find();
    res.json(roomTypes);
})

router.post("/",async (req,res) => {
    const roomType = new RoomTypes({
        rtyName: req.body.rtyName
    })
    const addedRoomType = await roomType.save();
    res.json(added);
})

module.exports = router;