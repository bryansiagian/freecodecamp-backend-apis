const fs = require("fs");
const crypto = require("crypto");
const os = require("os");

fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
fs.appendFileSync("assets/output.txt", "\nThis is the second line");

const buf = Buffer.from("Hello, Node!");
console.log(buf);
console.log(buf.toString("hex"));
console.log(buf.toString("base64"));

const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2);

const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8");
console.log(decoded);

const hash = crypto.createHash("sha256").update("freeCodeCamp!").digest("hex");
console.log(hash);

const random = crypto.randomBytes(16).toString("hex");
console.log(random);

const id = crypto.randomUUID();
console.log(id);

console.log(os.platform());
console.log(os.arch());
console.log(os.hostname());

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());

console.log(os.cpus().length);