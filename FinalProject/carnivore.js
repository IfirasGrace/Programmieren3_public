const LivingCreature = require("livingCreatures");
module.exports = class Carnivore extends LivingCreature{

    constructor(x, y, index){
        super(x, y, index);
        this.energy = 6;
    }

    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    getNewCoordinates(){

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    move(){

        if(this.energy >= 0){
            
            let emptyCells = this.chooseCell(0);
            let grassCells = this.chooseCell(1);

            let totalCells = emptyCells.concat(grassCells);

            if(totalCells.length !== 0){

                let theChosenField = random(totalCells);

                let newX = theChosenField[0];
                let newY = theChosenField[1];

                matrix[newY][newX] = 3;
                matrix[this.y][this.x] = 0;

                for(let i in grassArr){

                    let grassObj = grassArr[i];

                    if(grassObj.x == this.x && grassObj.y == this.y){

                        matrix[this.y][this.x] = 1;
                        break;

                    }
                }

                this.energy--;
                this.multiply = 0;
                this.x = newX;
                this.y = newY;
            }
        }else if(this.energy < 0){

            this.die();

        }
    }

    eat(){

        if(this.energy >= 0){

            let grazerCells = this.chooseCell(2);

            if(grazerCells.length !== 0){
            
                let theChosenGrazer = random(grazerCells);

                let newX = theChosenGrazer[0];
                let newY = theChosenGrazer[1];

                matrix[newY][newX] = 3;
                matrix[this.y][this.x] = 0;

                for(let i in grazerArr){

                    let grazerObj = grazerArr[i];

                    if(grazerObj.x == newX && grazerObj.y == newY){

                        grazerArr.splice(i, 1);
                        break;

                    }

                }
                
                this.energy++;
                this.multiply++;
                this.x = newX;
                this.y = newY;

            }else if(grazerCells.length == 0){

                this.move();

            }

        }else if(this.energy < 0){

            this.die();

        }
    }

    mul(){

        if(this.multiply >= 6){

            let emptyCells = this.chooseCell(0);

            if(emptyCells.length !== 0){

                let theNewCarnivore = random(emptyCells);

                let newCarnivoreX = theNewCarnivore[0];
                let newCarnivoreY = theNewCarnivore[1];

                matrix[newCarnivoreY][newCarnivoreX] = 3;

                let newCarnivoreObj = new Carnivore(newCarnivoreX, newCarnivoreY);
                carnivoreArr.push(newCarnivoreObj);

            }

            this.multiply = 0;

        }

    }

    die(){
        
        matrix[this.y][this.x] = 0;

        for(let i in carnivoreArr){

            let carnivoreObj = carnivoreArr[i];

            if(carnivoreObj.x == this.x && carnivoreObj.y == this.y){

                carnivoreArr.splice(i, 1);
                break;

            }

        }

    }

}