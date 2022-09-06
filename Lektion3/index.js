const os = require("os");
let message = "Die Plattform ist ";

function main(){
    console.log(message + os.platform());
}

main();