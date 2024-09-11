class UserDatabase {
  static database = [];

  static addUser = (user) => {
    if(user.linkImgProfile === undefined) {
      user.linkImgProfile = null;
    }
    this.database.push(user);
  };

  static getAllUsers = () => {
    const filteredUser = this.database.map((user) => {
      return {
        name: user.name,
        email: user.email,
        linkImgProfile: user.linkImgProfile,
      };
    });

    return filteredUser;
  };

  static getUserById = (id) => {
    return this.database.find((user) => user.id === id);
  };

  static getUserByEmail = (email) => {
    return this.database.find((user) => user.email === email);
  };

  static updateUser = (email, user) => {
    const index = this.database.findIndex((user) => user.email === email);
    this.database[index].name = user.name;
    this.database[index].linkImgProfile = user.linkImgProfile;
  };

  static deleteUser = (email) => {
    const index = this.database.findIndex((user) => user.email === email);
    this.database.splice(index, 1);
  };
}

module.exports = UserDatabase;
