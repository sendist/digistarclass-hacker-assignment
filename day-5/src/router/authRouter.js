const express = require("express");
const Auth = require("../controller/authController");
const {
  validateAddUser,
  isUserAlreadyExists,
} = require("../middleware/userValidator");

const router = express.Router();

router.post("/signup", validateAddUser, isUserAlreadyExists, Auth.signUp);

router.post("/signin", Auth.signIn);

module.exports = router;