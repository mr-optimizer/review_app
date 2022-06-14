const nodemailer = require('nodemailer');

exports.generateOPT = (otpLength = 6) => {
  // generating 6 digit OTP
  let OTP = "";
  for (let i = 1; i <= otpLength; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

exports.generateMailTransporter = () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });
  return transporter;
};
