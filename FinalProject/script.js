const socket = io();

socket.on("send matrix", showMatrix);
socket.on("send weather", changeWeather);

function showMatrix(data){
    console.log(data);
    drawMatrix(data);
}

function changeWeather(data){
    console.log(data);
}
function setup(){
    createCanvas(side * 20, side * 20);
}

let side = 30;

function drawMatrix(matrix){
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
        }
    }
}