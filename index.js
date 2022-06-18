import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB connected");
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
