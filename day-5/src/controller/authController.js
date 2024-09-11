const User = require("../model/user");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isBodyValid } = require("../middleware/errorHandler");
const dotenv = require("dotenv");
dotenv.config();

class Auth {
  static signUp = async (req, res) => {
    if (!isBodyValid(req, res)) return;
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ message: "User berhasil ditambahkan" });
  };

  static signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      res
        .status(404)
        .json({ message: `User dengan email ${email} tidak ditemukan` });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = jsonwebtoken.sign(
        { email: user.email },
        process.env.JWT_SECRET, 
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ email, token });
    } else {
      res.status(401).json({ message: "Password salah" });
    }
  };
}

module.exports = Auth;
