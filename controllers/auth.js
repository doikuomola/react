import User from "../models/User.js";
import Token from "../models/Token.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const authControllers = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      // Make sure this account doesn't already exist
      const user = await User.findOne({ email });
      if (user)
        return res.status(401).json({
          message:
            "The email address you have entered is already associated with another account.",
        });

      const newUser = new User({
        ...req.body,
        role: "basic",
      });
      const user_ = await newUser.save();

      await sendVerificationEmail(user_, req, res);

      // res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      //validate password
      if (!user.comparePassword(req.body.password))
        return res.status(401).json({ message: "Invalid email or password" });

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).json({
          type: "not-verified",
          message: "Your account has not been verified.",
        });

      const { password, ...others } = user._doc;
      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateJWT(), user: others });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  verify: async (req, res) => {
    if (!req.params.token)
      return res
        .status(400)
        .json({ message: "We were unable to find a user for this token." });

    try {
      // Find a matching token
      const token = await Token.findOne({ token: req.params.token });

      if (!token)
        return res.status(400).json({
          message:
            "We were unable to find a valid token. Your token may have expired.",
        });

      // If we found a token, find a matching user
      User.findOne({ _id: token.userId }, (err, user) => {
        if (!user)
          return res.status(400).json({
            message: "We were unable to find a user for this token.",
          });

        if (user.isVerified)
          return res
            .status(400)
            .json({ message: "This user has already been verified." });

        // Verify and save the user
        user.isVerified = true;
        user.save(function (err) {
          if (err) return res.status(500).json({ message: err.message });

          res.status(200).send("The account has been verified. Please log in.");
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resendToken: async (req, res) => {
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

      if (user.isVerified)
        return res.status(400).json({
          message: "This account has already been verified. Please log in.",
        });

      await sendVerificationEmail(user, req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default authControllers;

async function sendVerificationEmail(user, req, res) {
  try {
    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(20).toString("hex"),
    });

    // const token = user.generateVerificationToken();

    // Save the verification token
    await token.save();

    let link = "http://" + req.headers.host + "/api/auth/verify/" + token.token;
    let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

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
      subject: "Account Verification Token",
      html: html,
    });
    console.log("email sent successfully");

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + ".",
    });
  } catch (error) {
    console.log(error);
  }
}
