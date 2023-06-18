const mysql = require("mysql");
const express = require("express");

let router = express.Router();

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

router.get("/deleteuser",(req,res) => {
    console.log(req.query.email)
    
    let sqlQuery = `delete from employees where email='${req.query.email}'`;
    
    connection.query(sqlQuery,(err,results) => {
        if(err){
            res.json(err)
        }else{
            res.json(results)
        }
    });
    });

    module.exports = router; 