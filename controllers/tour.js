import mongoose from "mongoose";
import { createError } from "../middleware/error.js";
import Tour from "../models/Tour.js";

const tourControllers = {
  createTour: async (req, res, next) => {
    const tour = req.body;
    const newTour = new Tour({
      ...tour,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    try {
      await newTour.save();
      res.status(201).json(newTour);
    } catch (error) {
      next(error);
    }
  },
  getTours: async (req, res, next) => {
    try {
      const tours = await Tour.find();
      res.status(200).json(tours);
    } catch (error) {
      next(error);
    }
  },
  getTour: async (req, res, next) => {
    const { id } = req.params;
    try {
      const tour = await Tour.findById(id);
      res.status(200).json(tour);
    } catch (error) {
      next(error);
    }
  },
  getToursByUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(404, "User does not exist"));
      }
      const userTours = await Tour.find({ creator: id });
      res.status(200).json(userTours);
    } catch (error) {
      next(error);
    }
  },
  deleteTour: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(create(404, `Tour with id: ${id} not found`));
      }
      await Tour.findByIdAndDelete(id);
      res.status(200).json({ message: "Tour has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
  updateTour: async (req, res, next) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(create(404, `Tour with id: ${id} not found`));
      }

      const updatedTour = await Tour.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedTour);
    } catch (error) {
      next(error);
    }
  },
};

export default tourControllers;
