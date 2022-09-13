let p = document.getElementById("pElement");
p.addEventListener("click", clickHandler);

let clickCounter = 0;

function clickHandler(event){
        clickCounter++;

        let str = "Vielen Dank für das Klicken." + clickCounter;
        this.innerText = str;
}

window.onclick = bodyClick;

// DOM Event
function bodyClick(event){
    console.log(event);
    console.log("Es wurde geklickt bei : " + event.pageX + ", " + event.pageY);
}

// p5
function setup(){
    background("red");
}

function mouseClicked(){
    console.log("P5: " + mouseX + ", " + mouseY);
}

function preload(){
    console.log("Window is loaded.");
}

function keyPressed(){
    console.log(key);
}