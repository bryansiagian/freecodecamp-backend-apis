const fs = require("fs");

fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
fs.appendFileSync("assets/output.txt", "\nThis is the second line");

const buf = Buffer.from("Hello, Node!");
console.log(buf);