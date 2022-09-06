class Grass{

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.multiply = 0;

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

    chooseCell(){

        let found = [];

        for(let i in this.directions){
            let posCellArr = this.directions[i];
            let x = posCellArr[0];
            let y = posCellArr[1];

            if(y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length){
                if(matrix[y][x] == 0){
                    found.push(posCellArr);
                }
            }
        }
        return found;
    }

    mul(){

        this.multiply++;

        if(this.multiply >= 6){

            let emptyCells = this.chooseCell();

            let theChosenField = random(emptyCells);

            if(theChosenField){
                let newX = theChosenField[0];
                let newY = theChosenField[1];

                let newGrassObj = new Grass(newX, newY);
                grassArr.push(newGrassObj);

                matrix[newY][newX] = 1;
            }
            this.multiply = 0;
        }

    }

}


class Grazer{

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.multiply = 0;
        this.energy = 8;

        this.directions = [];
    }

    chooseCell(symbol){

        this.getNewCoordinates();

        let found = [];

        for(let i in this.directions){
            let posCellArr = this.directions[i];
            let x = posCellArr[0];
            let y = posCellArr[1];

            if(y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length){
                if(matrix[y][x] == symbol){
                    found.push(posCellArr);
                }
            }
        }
        return found;
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

class Carnivore{

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.multiply = 0;
        this.energy = 6;

        this.directions = [];
    }

    chooseCell(symbol){

        this.getNewCoordinates();

        let found = [];

        for(let i in this.directions){
            let posCellArr = this.directions[i];
            let x = posCellArr[0];
            let y = posCellArr[1];

            if(y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length){
                if(matrix[y][x] == symbol){
                    found.push(posCellArr);
                }
            }
        }
        return found;
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

// Fleischfressende Pflanze, die sich von EINEM anliegenden "Grazer" oder "Carnivore" ernährt, sich aber nicht bewegen kann.
// Beim Verhungern verwandelt sie sich in Gras.
// Außerdem kann sie sich nur auf anliegendes Gras reproduzieren und isst anliegende andere Pflanzen, um Gras für die Vermehrung zu schaffen, falls keines verfügbar ist.

class Flytrap{

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.energy = 10;
        this.multiply = 0;

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

    chooseCell(symbol){

        let found = [];

        for(let i in this.directions){
            let posCellArr = this.directions[i];
            let x = posCellArr[0];
            let y = posCellArr[1];

            if(y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length){
                if(matrix[y][x] == symbol){
                    found.push(posCellArr);
                }
            }
        }
        return found;
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