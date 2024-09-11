const User = require("../model/user");
const { isBodyValid } = require("../middleware/errorHandler");

class UserController {

  static async getAllUsers(req, res) {
    const users = await User.find()
      .select({ _id: 0, name: 1, email: 1, linkImgProfile: 1 })
      .exec();
    res.status(200).json(users);
  }

  static async updateUser(req, res) {
    if (!isBodyValid(req, res)) return;
    const user = req.user;
    const changeUser = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { name: changeUser.name, linkImgProfile: changeUser.linkImgProfile }},
      { new: true }
    ).exec();
    res.status(200).json(updatedUser);
  }

  static async deleteUser(req, res) {
    const user = req.user;
    await User.findOneAndDelete({ email: user.email }).exec();
    res.status(200).json({ message: `User ${user.email} berhasil dihapus` });
  }

  static async getUserData(req, res) {
    const user = req.user;
    const userData = await User.findOne({ email: user.email }).exec();
    if (!userData) {
      return res
        .status(404)
        .json({ message: `User dengan email ${user.email} tidak ditemukan` });
    }
    res.status(200).json(userData);
  }
}

module.exports = UserController;
