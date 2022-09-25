const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  const bearerToken = req.headers?.authorization;
  if (!bearerToken) return sendError(res, "unauthorized access!");

  const token = bearerToken.split(" ")[1];
  if (!token) return sendError(res, "unauthorized access!");

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode.userId) {
    return sendError(res, "unauthorized access!");
  }

  const user = await User.findById(decode.userId);
  if (!user) {
    return sendError(res, "unauthorized access!");
  }

  req.user = user;

  next();
};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role === "admin") next();
  else return sendError(res, "unauthorized access!");
};
