const express = require("express");
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

app.use(express.static("./"));

app.get("/", function(req, res){
    res.redirect("index.html");
});

server.listen("3000", function(){
    console.log("Project started.");
});

io.on("connection", function(socket){
    console.log("Connected");
    startGame();
});

const Grass = require("./grass");
const Grazer = require("./grazer");
const Carnivore = require("./carnivore");
const Flytrap = require("./flytrap");

matrix = [
    [0, 1, 0, 1, 1, 0, 0],
    [1, 2, 0, 1, 0, 2, 1],
    [0, 2, 2, 0, 1, 1, 0],
    [2, 0, 1, 3, 3, 1, 2],
    [1, 2, 0, 0, 1, 0, 3],
    [3, 1, 4, 2, 1, 1, 0],
    [0, 1, 3, 2, 0, 4, 1]
];

let fr = 480;

grassArr = [];
grazerArr = [];
carnivoreArr = [];
flytrapArr = [];
let fog = false;

function startGame(){

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            let wert = matrix[y][x];
            if(wert == 1){
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }else if(wert == 2){
                let grazer = new Grazer(x, y);
                grazerArr.push(grazer);
            }else if(wert == 3){
                let carnivore = new Carnivore(x, y);
                carnivoreArr.push(carnivore);
            }else if(wert == 4){
                let flytrap = new Flytrap(x, y);
                flytrapArr.push(flytrap);
            }
        }
    }

    io.sockets.emit("send matrix", matrix);
    setInterval(updateWorld, fr);
    setInterval(updateWeather, fr * 20);

}

function updateWorld(){
    // for(let y = 0; y < matrix.length; y++){
    //     for(let x = 0; x < matrix[y].length; x++){

    //         // console.log("Lebewesen", matrix[y][x]);
    //         // console.log("Position: ", x, y);

    //     }

    // }

    for(let i in grassArr){
        let grObj = grassArr[i];
        grObj.mul();
    }

    for(let i in carnivoreArr){
        let carnObj = carnivoreArr[i];
        carnObj.eat();
        carnObj.mul();
        }

    for(let i in grazerArr){
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
    }

    for(let i in flytrapArr){
        let flyObj = flytrapArr[i];
        flyObj.eat();
        flyObj.mul();
    }

    io.sockets.emit("send matrix", matrix);

}
/*
function updateWeather(){
    let fog = !fog;
    console.log("Fog");
    io.sockets.emit("send weather", fog);
}
*/