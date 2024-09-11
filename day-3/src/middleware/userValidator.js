const { body } = require("express-validator");
const db = require("../database/database");
const User = require("../model/user");

const validateAddUser = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 15 })
    .withMessage("nama harus berupa string dan memiliki panjang 3-15 karakter"),
  body("email")
    .exists()
    .isEmail()
    .withMessage("email wajib diisi dan harus berupa email valid"),
  body("password")
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage(
      "password harus berupa string dan memiliki panjang 7-15 karakter"
    ),
  body("linkImgProfile")
    .optional()
    .isURL()
    .withMessage("linkImgProfile harus berupa URL"),
];

const validateUpdateUser = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 15 })
    .withMessage("nama harus berupa string dan memiliki panjang 3-15 karakter"),
  body("linkImgProfile")
    .optional()
    .isURL()
    .withMessage("linkImgProfile harus berupa URL"),
];

const isUserAuthenticated = async (req, res, next) => {
  const { email, password } = req.body;

  const user = db.getUserByEmail(email);

  console.log(user);
  if (!user) {
    res
      .status(404)
      .json({ message: `user dengan email ${email} tidak ditemukan` });
    return;
  }
  if (user && user.password === password) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const isUserAlreadyExists = async (req, res, next) => {
  const { email } = req.body;

  const userEmail = db.getUserByEmail(email);

  if (userEmail) {
    res.status(400).json({ message: `User dengan email ${email} telah ada` });
    return;
  }
  next();
};

module.exports = {
  validateAddUser,
  validateUpdateUser,
  isUserAuthenticated,
  isUserAlreadyExists,
};
