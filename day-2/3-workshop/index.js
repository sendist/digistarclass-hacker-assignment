// index.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  switch (req.method) {
    case "GET":
      res.end("GET request: Sendi\n");
      break;
    case "POST":
      res.end("POST request: Sendi\n");
      break;
    case "PUT":
      res.end("PUT request: Sendi\n");
      break;
    case "DELETE":
      res.end("DELETE request: Sendi\n");
      break;
    default:
      res.end("Received an unknown request\n");
      break;
  }
});

server.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
