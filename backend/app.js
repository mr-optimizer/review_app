const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

require("express-async-errors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const userRouter = require("./routes/user");
const { errorHandler } = require("./middleware/error");
const { handleNotFound } = require("./utils/Error");

app.use(cors()) //for cors error
app.use(morgan("dev")); //middleware to log HTTP requests and errors,
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use('/*', handleNotFound);


app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port ", process.env.PORT);
});
