const error = (err, req, res, next) => {
  return res.status(500).json({ message: err.message || "Something failed" });
};

module.exports = error;
