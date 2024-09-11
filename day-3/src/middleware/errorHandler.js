const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({ message: "Data not found" });
};
