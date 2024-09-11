const express = require("express");
const userController = require("../controller/userController");
const {
  validateAddUser,
  validateUpdateUser,
  isUserAuthenticated,
  isUserAlreadyExists,
} = require("../middleware/userValidator");

const router = express.Router();

router.post("/", validateAddUser, isUserAlreadyExists, userController.addUser);

router.get("/", isUserAuthenticated, userController.getAllUsers);

router.put("/", validateUpdateUser, isUserAuthenticated, userController.updateUser);

router.delete("/", isUserAuthenticated, userController.deleteUser);

router.get("/data", isUserAuthenticated, userController.getUserData);

module.exports = router;
