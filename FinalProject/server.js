const grass = require("./grass");
const grazer = require("./grazer");
const carnivore = require("./carnivore");
const flytrap = require("./flytrap");

matrix = [
    [0, 1, 0, 1, 1, 0, 0],
    [1, 2, 0, 1, 0, 2, 1],
    [0, 2, 2, 0, 1, 1, 0],
    [2, 0, 1, 3, 3, 1, 2],
    [1, 2, 0, 0, 1, 0, 3],
    [3, 1, 4, 2, 1, 1, 0],
    [0, 1, 3, 2, 0, 4, 1]
];

let side = 20;
let fr = 60;

let grassArr = [];
let grazerArr = [];
let carnivoreArr = [];
let flytrapArr = [];

function setup(){

    // matrix = randomMatrix(10, 20);

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
}

setInterval(updateCreature, fr);

function updateCreature(){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){

            console.log("Lebewesen", matrix[y][x]);
            console.log("Position: ", x, y);

        }

    }

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

}