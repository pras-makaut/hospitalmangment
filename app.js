const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require('mysql');


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Prashant@1234",
    insecureAuth : true,
    database: "sample_db"
  });
  
  con.connect(function(error){
    if(!!error){
        console.log("Error");
    } else{
        console.log("connection");
    }
  });
  
 

app.get("/",function(req,res){
    con.query("SELECT * FROM doctor",function(error,rows,feilds){
        if(!!error){
            console.log("error in the query");
        }else{
            //console.log(rows);
            res.render("doctors", {doctorsArray:rows});
        }
  });
  });
  app.post("/",function(req,res){
    console.log(req);
    /*connection.query("INSERT INTO paiteints (Name, Email, Password) VALUES", (name , email, password), function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });*/
      /*con.query("SELECT ACCOUNT_ID FROM paiteints WHERE Email = '"+ req.body.email +"'", function(err, result, field){
        if(result.length === 0){
           //new user logic
        }else{  
            console.log("USER EXITS");
         }
    });*/
    con.query('SELECT * FROM paiteints WHERE Email ="' + req.body.email  +'"', function (err, result) {
        if (err) throw err;
        console.log(result);
        //You will get an array. if no users found it will return.
        
        console.log(result.length);
        if(result.length === 0){  
            //Then do your task (run insert query)
            res.redirect("/signup");
        }else{
            res.redirect("/doctorlist");
        }

      });
      /*var sql = "INSERT INTO `paiteints`(`Name`,`Email`, `Password`) VALUES ('"+req.body.fname+"','"+req.body.email+"','"+req.body.password+"')";
      con.query(sql, function(err, result)  {
       if(err) throw err;
       console.log("table created");
      });*/
  });
  app.get("/signup",function(req,res){
    res.render("paiteint");
});
    app.post("/signup",function(req,res){
        console.log(req);
        var sql = "INSERT INTO `paiteints`(`Name`,`Email`, `Password`) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
      con.query(sql, function(err, result)  {
       if(err) throw err;
       console.log("table created");
       res.redirect("/");
      });
    });
app.get("/doctorlist",function(req,res){
    con.query("SELECT * FROM doctor",function(error,rows,feilds){
        if(!!error){
            console.log("error in the query");
        }else{
            //console.log(rows);
            res.render("doctorlist", {doctorsArray:rows});
        }
  });
});
  
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

