const http = require("http");
const { join } = require("path");

const server = http.createServer((request, response) => {
  console.log(request.headers);
  console.log(request.url);
  const url = request.url === "/" ? "/index.html" : request.url;
  const filePath = join("public", url);
  response.end(filePath, "utf-8");
});

server.listen(3001);