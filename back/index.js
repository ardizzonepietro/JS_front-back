var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs")


var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});



apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  var let = "";
  fs.readFile("back/users.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("errore nella lettura del file:", err);
        return;
    }
   let = JSON.parse(jsonString)
   console.log("c: "+let)
   for (let index = 0; index < let.length; index++) {
     console.log(let[index].user+" "+let[index].pw)
    if(req.query.mail===let[index].user && req.query.password===let[index].pw){
      res.status(200).json({"message":"login effettuato"});
    }else{
      res.status(400).json({"message":"login fallito"});
    }
    }
     
   
  })
  
});
