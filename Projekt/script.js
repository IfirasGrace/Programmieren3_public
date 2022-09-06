let matrix = [];
let side = 50;

let grassArr = [];
let grazerArr = [];
let carnivoreArr = [];
let flytrapArr = [];

function setup(){

    matrix = randomMatrix(10, 20);
    
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background("acacac");

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

function draw(){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 0){
                fill("grey");
            }else if(matrix[y][x] == 1){
                fill("green");
            }else if(matrix[y][x] == 2){
                fill("gold")
            }else if(matrix[y][x] == 3){
                fill("red");
            }else if(matrix[y][x] == 4){
                fill("lightcoral");
            }
            rect(x * side, y * side, side, side);

            fill("white");
            textSize(9);
            text(x + "/" + y, x * side + side/2, y * side + side/2);
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

function randomMatrix(width, height){
    let matrix = [];
    for(let y = 0; y < height; y++){
        matrix[y] = [];
        for(let x = 0; x < width; x++){
            matrix[y][x] = Math.round(Math.random() * 4);
        }
    }

    return matrix;
    
}