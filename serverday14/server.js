const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");


let app = express();
app.use(cors());
app.use("/uploads",express.static("uploads"));



const signUpRouter = require("./routes/SignUpRoute")
app.use("/",signUpRouter);

const loginRouter = require("./routes/LoginRoute")
app.use("/",loginRouter);

const deleteRouter = require("./routes/DeleteRoute")
app.use("/",deleteRouter);


let connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"dheeraj1"
})

connection.connect((err)=>{
    if(err)
    {
        console.log("Cannot connect to Database");
        res.json(err);

    }else{
        console.log("Connected to Database");
    }
})

app.listen(1008,()=>{
    console.log("Listening to port 1008");
});

