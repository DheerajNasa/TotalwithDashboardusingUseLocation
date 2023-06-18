
const express = require("express");
const mysql = require("mysql");

const multer = require("multer");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })



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

router.post("/signup",upload.single("profilePic"), async (req,res)=>{

    let hashedPassword = await bcrypt.hash(req.body.password,10)
    
    let sqlQuery = `insert into employees (name,email,password,profilePic) 
                    values ('${req.body.name}','${req.body.email}','${hashedPassword}',
                    '${req.file.destination}/${req.file.filename}')`;
                    
console.log(sqlQuery)
console.log(req.file)
    connection.query(sqlQuery,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.json(err);
        }else{
            res.json(results);
            console.log(["User created successfully"]);
            
        }
    });
});


router.patch("/updateuser",upload.single("profilePic"),async(req,res) => {
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password,10)
    let sqlQuery = `update employees set password='${hashedPassword}',
                    profilePic='${req.file.destination}/${req.file.filename}'
                    where email='${req.body.email}'`

                    console.log(sqlQuery)
                    console.log(req.file)
                    connection.query(sqlQuery,(err,results)=>{
                        if(err){
                            res.json(err);
                        }else{
                            res.json(results)
                        }
                    })
});

module.exports = router;