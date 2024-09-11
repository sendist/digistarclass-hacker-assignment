const http = require("http");

let admin = {
  username: "admin",
  password: "admin123",
};

let databaseUser = [];

const userNotFound = (res, id) => {
  res.statusCode = 404;
  res.end(`User dengan id ${id} tidak ditemukan`);
};

const isAuthenticated = (res, req, bodyParse) => {
  if ( bodyParse.username === admin.username && bodyParse.password === admin.password) {
    return true;
  }
  res.statusCode = 401;
  res.end("username atau password admin salah");
};

const server = http.createServer((req, res) => {
  if (req.url !== "/users") {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  } else {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    switch (req.method) {
      case "POST":
        req.on("end", () => {
          const bodyParse = JSON.parse(body);

          if (databaseUser.find((u) => u.id === bodyParse.id)) {
            res.statusCode = 500;
            res.end("sudah ada id yang sama di database");
            return;
          }

          databaseUser.push(bodyParse);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(bodyParse));
        });
        break;
      case "GET":
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(databaseUser));
        break;
      case "PUT":
        req.on("end", () => {
          const bodyParse = JSON.parse(body);

          if (!isAuthenticated(res, req, bodyParse)) {
            return;
          }

          let userIndex = databaseUser.findIndex((u) => u.id === bodyParse.id);

          if (userIndex === -1) {
            userNotFound(res, bodyParse.id);
          }

          delete bodyParse.username;
          delete bodyParse.password;

          databaseUser[userIndex] = bodyParse;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(bodyParse));
        });
        break;
      case "DELETE":
        req.on("end", () => {
          const bodyParse = JSON.parse(body);

          if (!isAuthenticated(res, req, bodyParse)) {
            return;
          }

          let userIndex = databaseUser.findIndex((u) => u.id === bodyParse.id);

          if (userIndex === -1) {
            userNotFound(res, bodyParse.id);
          }

          databaseUser.splice(userIndex, 1);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(bodyParse.id));
        });
        break;
      default:
        res.statusCode = 405;
        res.end("Method Not Allowed");
        break;
    }
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
