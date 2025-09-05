require("dotenv").config();
const express = require("express");
const apiSeed = require("./seed");
const app = express();


require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Log the error, perform cleanup, and potentially exit gracefully
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Log the unhandled rejection
});
