const express = require("express");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const dotenv = require("dotenv");
const app = express();
const { connect, disconnect } = require("./database/dbConfig");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = 3000;

connect();

app.use(express.json());

app.use("/users", userRouter);

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Anda mau kemana" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
