const { body } = require("express-validator");
const User = require("../model/user");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

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

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Token otorisasi harus diisi" });
    return;
  }
  try {
    const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = user;

    const isUserExists = await User.findOne({
      email: user.email,
    }).exec();

    if (!isUserExists) {
      res
        .status(401)
        .json({ message: "User dengan token ini sudah tidak ada" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const isUserAlreadyExists = async (req, res, next) => {
  const { email } = req.body;

  const userEmail = await User.findOne({
    email: email,
  }).exec();

  if (userEmail) {
    res.status(400).json({ message: `User dengan email ${email} telah ada` });
    return;
  }
  next();
};

module.exports = {
  validateAddUser,
  validateUpdateUser,
  isUserAlreadyExists,
  verifyToken,
};
