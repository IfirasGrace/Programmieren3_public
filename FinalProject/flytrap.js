const LivingCreature = require("./livingCreatures");
module.exports = class Flytrap extends LivingCreature{

    constructor(x, y){
        super(x, y);
        this.energy = 10;
    }

    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    eat(){

        if(this.energy >= 0){

            let grazerCells = this.chooseCell(2);
            let carnivoreCells = this.chooseCell(3);
            let foodCells = grazerCells.concat(carnivoreCells);

            if(foodCells.length !== 0){
            
                let theChosenFood = random(foodCells);

                let foodX = theChosenFood[0];
                let foodY = theChosenFood[1];

                matrix[foodY][foodX] = 0;

                for(let i in grazerArr){

                    let grazerObj = grazerArr[i];

                    if(grazerObj.x == foodX && grazerObj.y == foodY){

                        grazerArr.splice(i, 1);
                        break;

                    }

                }

                for(let i in carnivoreArr){

                    let carnivoreObj = carnivoreArr[i];

                    if(carnivoreObj.x == foodX && carnivoreObj.y == foodY){

                        carnivoreArr.splice(i, 1);
                        break;

                    }

                }
                
                this.energy++;
                this.multiply++;

            }else if(foodCells.length == 0){

                this.energy--;
                this.multiply = 0;

            }

        }else if(this.energy < 0){

            this.die();

        }
    }

    mul(){

        if(this.multiply >= 4){

            let grassCells = this.chooseCell(1);

            if(grassCells.length !== 0){

                let theNewFlytrap = random(grassCells);

                let newFlytrapX = theNewFlytrap[0];
                let newFlytrapY = theNewFlytrap[1];

                matrix[newFlytrapY][newFlytrapX] = 4;

                let newFlytrapObj = new Flytrap(newFlytrapX, newFlytrapY);
                flytrapArr.push(newFlytrapObj);

                for(let i in grassArr){

                    let grassObj = grassArr[i];

                    if(grassObj.x == newFlytrapX && grassObj.y == newFlytrapY){

                        grassArr.splice(i, 1);
                        break;

                    }

                }

                this.multiply = 0;

            }else if(grassCells.length == 0){

                let flytrapCells = this.chooseCell(4);

                if(flytrapCells.length !== 0){

                    let theKilledFlytrap = random(flytrapCells);

                    let newGrassX = theKilledFlytrap[0];
                    let newGrassY = theKilledFlytrap[1];

                    matrix[newGrassY][newGrassX] = 1;

                    let newGrassObj = new Grass(newGrassX, newGrassY);
                    grassArr.push(newGrassObj);

                    for(let i in flytrapArr){

                        let flytrapObj = flytrapArr[i];

                        if(flytrapObj.x == newGrassX && flytrapObj.y == newGrassY){

                            flytrapArr.splice(i, 1);
                            break;

                        }

                    }

                }

            }

        }

    }

    die(){
        
        matrix[this.y][this.x] = 1;

        let deadFlytrapObj = new Grass(this.x, this.y);
        grassArr.push(deadFlytrapObj);

        for(let i in flytrapArr){

            let flytrapObj = flytrapArr[i];

            if(flytrapObj.x == this.x && flytrapObj.y == this.y){

                flytrapArr.splice(i, 1);
                break;

            }

        }

    }

}