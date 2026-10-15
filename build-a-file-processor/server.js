const fs = require("fs");

const data = fs.readFileSync("assets/poem.txt");
console.log(data);