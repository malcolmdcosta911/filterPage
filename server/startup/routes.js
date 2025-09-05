const bodyParser = require("body-parser");
const products = require("../routes/products");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use("/api/products", products);
  app.use(error); //works if try catch not used
};
