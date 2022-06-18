import express from "express";
import authControllers from "../controllers/auth.js";
import { check } from "express-validator";
import authenticate from "../middlewares/authenticate-middleware.js";
import { validate } from "../middlewares/validate.js";
import passwordControllers from "../controllers/password.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("You first name is required"),
    check("lastName").not().isEmpty().withMessage("You last name is required"),
  ],
  validate,
  authControllers.register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").not().isEmpty(),
  ],
  validate,
  authControllers.login
);

//EMAIL Verification
router.get("/verify/:token", authControllers.verify);
router.post("/resend", authControllers.resendToken);

//Password RESET
router.post(
  "/recover",
  [check("email").isEmail().withMessage("Enter a valid email address")],
  validate,
  passwordControllers.recover
);

router.get("/reset/:token", passwordControllers.reset);

router.post(
  "/reset/:token",
  [
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  validate,
  passwordControllers.resetPassword
);

export default router;
