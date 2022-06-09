import express from "express";
import tourControllers from "../controllers/tour.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, tourControllers.createTour);
router.get("/", tourControllers.getTours);
router.get("/userTours/:id", auth, tourControllers.getToursByUser);
router.get("/:id", tourControllers.getTour);
router.patch("/:id", auth, tourControllers.updateTour);
router.delete("/:id", auth, tourControllers.deleteTour);

export default router;
