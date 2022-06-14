const morgan = require("morgan");
const express = require("express");
const app = express();

require("express-async-errors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const userRouter = require("./routes/user");
const { errorHandler } = require("./middleware/error");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port ", process.env.PORT);
});
