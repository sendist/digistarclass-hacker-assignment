const express = require("express");
const userController = require("../controller/userController");
const {
  validateUpdateUser,
  verifyToken,
} = require("../middleware/userValidator");

const router = express.Router();

router.use(verifyToken);

router.get("/", userController.getAllUsers);

router.put("/", validateUpdateUser, userController.updateUser);

router.delete("/", userController.deleteUser);

router.get("/data", userController.getUserData);

module.exports = router;
