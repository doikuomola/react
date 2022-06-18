import express from "express";
import { check } from "express-validator";
import multer from "multer";
import { userControllers } from "../controllers/user.js";

const User = require("../controllers/user");
const validate = require("../middlewares/validate");

const router = express.Router();

const upload = multer().single("profileImage");

//INDEX
router.get("/", userControllers.index);

//STORE
router.post(
  "/",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("username").not().isEmpty().withMessage("You username is required"),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("You first name is required"),
    check("lastName").not().isEmpty().withMessage("You last name is required"),
  ],
  validate,
  userControllers.store
);

//SHOW
router.get("/:id", userControllers.show);

//UPDATE
router.put("/:id", upload, userControllers.update);

//DELETE
router.delete("/:id", userControllers.destroy);

module.exports = router;
