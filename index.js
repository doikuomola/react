import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import authRoute from "./routers/auth.js";
import tourRoute from "./routers/tour.js";

const app = express();

const connectToDb = () => {
  const uri = process.env.MONGO_URI;
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch (error) {
    throw error;
  }
};

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// routers
app.use("/api/auth", authRoute);
app.use("/api/tour", tourRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    success: false,
    stack: err.stack,
  });
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectToDb();
  console.log(`Server running on port ${port}...`);
});
