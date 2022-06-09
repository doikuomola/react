import express from "express";
import authControllers from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", authControllers.signup);

router.post("/signin", authControllers.signin);
router.post("/googleSignIn", authControllers.googleSignIn);

export default router;
