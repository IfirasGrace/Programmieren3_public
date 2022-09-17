const LivingCreature = require("livingCreatures");
module.exports = class Grass extends LivingCreature{

    constructor(x, y, index){
        super(x, y, index);
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