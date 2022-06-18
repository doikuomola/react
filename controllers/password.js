import User from "../models/User.js";
import sendEmail from "../utils/email.js";
import nodemailer from "nodemailer";


const passwordControllers = {
  recover: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      await user.save();

      // send email
    
      let link =
        "http://" +
        req.headers.host +
        "/api/auth/reset/" +
        user.resetPasswordToken;
      let html = `<p>Hi ${user.username}</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        auth: {
          user: "doikuomola@gmail.com",
          pass: "gdfqnxmqwsxwnkas",
        },
      });
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "Password Reset Token",
        html: html,
      });
      console.log("email sent successfully");

      res.status(200).json({
        message: "A reset email has been sent to " + user.email + ".",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  reset: async (req, res) => {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      //Set the new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.isVerified = true;

      // Save the updated user object
      await user.save();

      let subject = "Your password has been changed";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let html = `<p>Hi ${user.username}</p>
                    <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`;

      await sendEmail({ to, from, subject, html });

      res.status(200).json({ message: "Your password has been updated." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default passwordControllers;
