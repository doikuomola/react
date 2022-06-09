import { createError } from "../middleware/error.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

const authControllers = {
  googleSignIn: async (req, res, next) => {
    const { email, name, token, googleId } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const result = { _id: user._id.toString(), email, name };
        return res.status(200).json({ result, token });
      }
      const newUser = new User({
        email,
        name,
        googleId,
      });

      await newUser.save();

      res.status(200).json({ result: newUser, token });
    } catch (error) {
      next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(400, "User not found"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) return next(createError(400, "Invalid password"));
      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1d",
      });
      res.cookie("access_token", token, { httpOnly: true });
      const { password, ...others } = user._doc;
      res.status(200).json({ result: others, token: token });
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) return next(createError(400, "User already exists"));

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        name: `${req.body.firstName} ${req.body.lastName}`,
      });

      await user.save();

      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1d",
      });
      res.cookie("access_token", token, { httpOnly: true });

      const { password, ...others } = user._doc;
      res.status(201).json({ others, token: token });
    } catch (error) {
      next(error);
    }
  },
};

export default authControllers;
