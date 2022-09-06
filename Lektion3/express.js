const express = require("express");
const app = express();

app.use(express.static("../Projekt"));

app.get("/", function(req, res){
    res.redirect("index.htmlHTML");
});

app.get("/", function(req, res){
    res.send("<h1>Hello World!</h1>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>")
});

app.get('/google/:searched', function(req, res){
    let searched = req.params.searched;
    res.redirect("http://google.com/search?q=" + searched);
});

app.get("/*", function(req, res){
    res.status(404).send("Sorry, we cannot find that!");
});

app.listen(3000, function(){
    console.log("Server can listen. Server will listen.");
});