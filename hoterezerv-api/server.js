//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const authRoute = require("./routes/Authentication");
const roomTypesRoute = require("./routes/RoomTypes");
const jwt = require('jsonwebtoken');
//Initalize Server
const app = express();

const authenticateToken = (req, res,next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user
    next();
  })

}

//MiddleWares
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/users", authRoute);
app.use("/roomTypes",authenticateToken, roomTypesRoute)

//Connect to mongo db
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},() => console.log("Connected Successfully"));

//Routes
app.get("/",(req,res) => {
    res.send("<h1 align=\"center\">Hotel Rezerv API v1.0.0</h1>");
})

//PORT INFORMATION
app.listen(process.env.SERVER_PORT,() => console.log("Server Started at " + process.env.SERVER_PORT));