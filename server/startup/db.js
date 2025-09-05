const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.MONGO_URL;
  mongoose.connect(db).then(() => console.log(`mongoose Connected to ${db}...`));
};
