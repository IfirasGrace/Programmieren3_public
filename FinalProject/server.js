const grass = require("./grass");
const Grazer = require("./grazer");
const Carnivore = require("./carnivore");
const Flytrap = require("./flytrap");

function setup(){

    matrix = randomMatrix(10, 20);

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

function updateCreature(){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){

            console.log("Lebewesen", matrix[y][x]);

        }

        console.log("Position: ", x, y);

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

    setInterval(updateCreature(), fr);

}