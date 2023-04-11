const app = require("./app");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server shutting down");
  mongoose.connection.close(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});
