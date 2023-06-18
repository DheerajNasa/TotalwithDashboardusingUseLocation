const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");


let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

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

router.post("/validatelogin",upload.none(),(req,res)=>{
    
    let sqlQuery = `select * from employees where email='${req.body.email}'`;

    connection.query(sqlQuery,async (err,results)=>{
        if(err){
            res.json(err);
        }else{
          
            let isValidPassword = await bcrypt.compare(req.body.password,results[0].password)
            
            if(isValidPassword == true)
            {
                res.json({
                    email:results[0].email,
                    name:results[0].name,
                    profilePic:results[0].profilePic,
                    isLoggedIn:true
                });
            }else{
                res.json({
                    msg:"Invalid UserName or Password",
                    isLoggedIn:false
            });
                
            }
        }
    })
})



module.exports = router;