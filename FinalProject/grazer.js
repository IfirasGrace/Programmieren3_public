class Grazer extends LivingCreature{

    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
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

            if(emptyCells.length !== 0){

                let theChosenField = random(emptyCells);

                let newX = theChosenField[0];
                let newY = theChosenField[1];

                matrix[newY][newX] = 2;
                matrix[this.y][this.x] = 0;

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

            let grassCells = this.chooseCell(1);

            if(grassCells.length !== 0){
            
                let theChosenGrass = random(grassCells);

                let newX = theChosenGrass[0];
                let newY = theChosenGrass[1];

                matrix[newY][newX] = 2;
                matrix[this.y][this.x] = 0;

                for(let i in grassArr){

                    let grassObj = grassArr[i];

                    if(grassObj.x == newX && grassObj.y == newY){

                        grassArr.splice(i, 1);
                        break;

                    }

                }
                
                this.energy++;
                this.multiply++;
                this.x = newX;
                this.y = newY;

            }else if(grassCells.length == 0){

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

                let theNewGrazer = random(emptyCells);

                let newGrazerX = theNewGrazer[0];
                let newGrazerY = theNewGrazer[1];

                matrix[newGrazerY][newGrazerX] = 2;

                let newGrazerObj = new Grazer(newGrazerX, newGrazerY);
                grazerArr.push(newGrazerObj);

            }

            this.multiply = 0;

        }

    }

    die(){
        
        matrix[this.y][this.x] = 0;

        for(let i in grazerArr){

            let grazerObj = grazerArr[i];

            if(grazerObj.x == this.x && grazerObj.y == this.y){

                grazerArr.splice(i, 1);
                break;

            }

        }

    }

}