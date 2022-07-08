const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const EmailVerificationToken = require("./../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const { generateOPT, generateMailTransporter } = require("../utils/mail");
const { sendError } = require("../utils/Error");
const passwordResetToken = require("../models/passwordResetToken");
const { generateRandomByte } = require("../utils/helper");

exports.create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, "User already exist");
  }
  const newUser = new User({ name, email, password });
  await newUser.save();

  //   generate new otp
  const OTP = generateOPT();
  // store OTP inside DB
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // sending OTP to user email
  var transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.in",
    to: newUser.email,
    subject: "Email Verification",
    html: `
            <p>Your Verification OTP</p>
            <h1>${OTP}</h1>
        `,
  });
  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, "User not found with this email");
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return sendError(res, "Password is Invalid");
  }
  const { _id, name, isVerified } = user;
  //   signing Json web token to logged in user
  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.json({ user: { id: _id, name, email, token: jwtToken, isVerified } });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!isValidObjectId(userId)) {
    return sendError(res, "Invalid User!!");
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "User not found!!", 404);
  }
  if (user.isVerified) {
    return sendError(res, "You are already verified!!");
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return sendError(res, "Please generate new OTP");
  }
  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, "Please enter a valid OTP");

  user.isVerified = true;
  user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.in",
    to: user.email,
    subject: "Welcome Email",
    html: `
        <p>Welcome To Our App and Thanks for Choosing Us.</p>
    `,
  });
  //   signing Json web token to logged in user
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
    message: "Your email is Verified",
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "User Not Found!!", 404);
  }
  if (user.isVerified) {
    return sendError(res, "You are already verified!!");
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (token) {
    return sendError(res, "You cannot resend OTP before one hour");
  }

  // generating 6 digit OTP
  let OTP = generateOPT();
  // store OTP inside DB
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  const result = await newEmailVerificationToken.save();
  // sending OTP to user email
  var transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.in",
    to: user.email,
    subject: "Email Verification",
    html: `
            <p>Your Verification OTP</p>
            <h1>${OTP}</h1>
        `,
  });
  res.status(201).json({
    message: "Please verify your email. New OTP has been sent to your email",
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return sendError(res, "Email is missing");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, "User not Found", 404);
  }
  const oldToken = await passwordResetToken.findOne({ owner: user._id });
  if (oldToken) {
    return sendError(res, "You can generate new OTP only after one hour");
  }
  //   generating new token for reset password
  const token = await generateRandomByte();
  const newPasswordResetToken = await passwordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const passwordResetUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  // sending passwordReset url to user email
  var transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.in",
    to: user.email,
    subject: "Reset Password",
    html: `
            <p style="color:red;">For reset your password, click the link given below</p>
            <a href=${passwordResetUrl}>CLICK HERE</a>
        `,
  });
  res.json({ message: "Link sent to your email!!" });
};

exports.sendPasswordResetTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "User Not Found!!", 404);
  }
  const isMatched = await user.comparePassword(newPassword);
  if (isMatched) {
    return sendError(res, "New Password must be different from old one");
  }

  user.password = newPassword;
  await user.save();

  //   deleting passwordToken from DB
  await passwordResetToken.findByIdAndDelete(req.resetToken._id);

  // sending passwordReset successfully to user email
  var transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.in",
    to: user.email,
    subject: "Password Changed Successfully",
    html: `
            <div style="color:green;">Your Password is changed successfully</div>
            <h5>Now you can use your new password</h5>
        `,
  });

  res.json({ message: "Password Changed Successfully" });
};
