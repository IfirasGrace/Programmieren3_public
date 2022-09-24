function getRandomElement(array){
    if(array == undefined || array.length == 0) return undefined;
    let randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
}

module.exports = {getRandomElement};