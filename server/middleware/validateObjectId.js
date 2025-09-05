const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const objectId = mongoose.isValidObjectId(req.params.id); //needed for /:id endpoint
  if (!objectId) return res.status(400).json({ message: "Invalid ID" });
  return next();
};

module.exports = validateObjectId;
