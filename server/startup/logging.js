process.on("uncaughtException", (err) => {
  //   logger.error(err.message, err);
  console.log(err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  //   logger.error(promise);
  console.log(promise);
  process.exit(1);
});
