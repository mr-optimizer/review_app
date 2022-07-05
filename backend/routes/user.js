const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgotPassword,
  sendPasswordResetTokenStatus,
  resetPassword,
  signInUser,
} = require("../controllers/user");
const {
  validate,
  userValidator,
  validatePassword,
  signInValidator,
} = require("../middleware/validator");
const { isValidPasswordResetToken } = require("../middleware/user");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signInUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
router.post("/forgot-password", forgotPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPasswordResetToken,
  sendPasswordResetTokenStatus
);
router.post(
  "/reset-password",
  isValidPasswordResetToken,
  validatePassword,
  validate,
  resetPassword
);

module.exports = router;
