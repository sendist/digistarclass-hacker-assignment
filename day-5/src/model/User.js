const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  linkImgProfile: {
    type: String,
    default:
      "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
  },
});

module.exports = mongoose.model("User", userSchema);
