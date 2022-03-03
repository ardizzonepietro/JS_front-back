var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs")
let mysql = require ('mysql');

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});
var connection = mysql.createConnection ({
  host: "ardizzone.pietro.tave.osdb.it",
  user: "c167_pietro",
  password: 'Az-24588',
  database: 'c167_node'
  });
  connection.connect(function(error){
   if(!!error){
    console.log('error: '+error)
   }else{
     console.log('connesso al db')
   }
  })

 
  

apiServer.get("/api/login", (req, res) => {
 
  console.log("ricevuti:", req.query.mail, req.query.password);
  var a = connection.query("SELECT * FROM utenti", (err, rows)=>{
    if(!err){
      console.log("ci");
      var x = 0;
      
        for (let index = 0; index < rows.length; index++) {
     console.log("m: "+rows[index].mail+" pw: "+rows[index].pw)
          if(rows[index].mail==req.query.mail ){
         
           
              console.log("oa")
              x=1
              res.status(200).json({"message":"login effettuato"});
            
            
          }
          
        }
        if(x==0){
          res.status(400).json({"message":"login fallito"});      
        }
    
    }
  })
});

apiServer.get("/api/reg", (req, res) =>{

  console.log("ricevuti:", req.query.mail, req.query.password);
  var sql = "INSERT INTO utenti (mail, pw) VALUES ('"+req.query.mail+"', '"+req.query.password+"')";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("err: "+err)
      res.status(400).json({"message":"inserimentyo fallito"});      
    }else{
      res.status(200).json({"message":"login effettuato"});
      console.log("1 record inserted");
    }
   
  });
 
})
  
