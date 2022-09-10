/*
const fs = require("fs");
const dummyText = "Apple yep";

function main(){
    fs.writeFileSync("dummytext.txt", dummyText);
    let text = fs.readFileSync("dummytext.txt").toString();
    console.log(dummyText == text);
    console.log(text);
    fs.writeFileSync("undummytext.txt",
        text.replace("Apple", "Microsoft")
    );
}

main();
*/

const fs = require("fs");

var obj = {
    "first_name": "Vardan",
    "last_name": "Hovspyan",
    "age": 13,
    "tumo_student": true
    }

    function main(){
        fs.writeFileSync("obj.json", JSON.stringify(obj));

        let text = fs.readFileSync("obj.json").toString();
        console.log(text);

        let jsObj = JSON.parse(text);
        console.log(jsObj.last_name);
    }

main();