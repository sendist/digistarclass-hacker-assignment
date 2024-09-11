const { validationResult } = require("express-validator");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({ message: "Data not found" });
};

const isBodyValid = (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ message: errors });
    return false;
  }
  return true;
};

module.exports = { errorHandler, notFoundHandler, isBodyValid};
