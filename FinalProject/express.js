const express = require("express");
const app = express();

app.use(express.static("FinalProject"));

app.get("/", function(req, res){
    res.redirect("server.js")
});

app.listen(3000, function(){
    console.log("Example is running");
});