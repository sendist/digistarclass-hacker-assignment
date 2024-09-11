const express = require("express");
const userRouter = require("./router/userRouter");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Anda mau kemana" });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
