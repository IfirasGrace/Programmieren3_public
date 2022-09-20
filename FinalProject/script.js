// p5 hier hin + kommunikation z.bsp. setup


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