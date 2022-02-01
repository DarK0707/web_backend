import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import Contanct from "./models/contactModel.js";
import asyncHandler from "express-async-handler";
import Feedback from "./models/feedback.js";
dotenv.config();
import cors from 'cors'
const port = process.env.PORT || 5000;
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors({
  origin: '*'
}))
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.post(
  "/api/contant",
  asyncHandler(async (req, res) => {
    const { name, email, contanttype, message } = req.body;

    const contant = await Contanct.create({
      name,
      email,
      contanttype,
      message,
    });

    if (contant) {
      res.status(201).json({
        _id: contant._id,
        name: contant.name,
        email: contant.email,
        contanttype: contant.contanttype,
        message: contant.message,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

app.post("/api/feedback", async (req, res) => {
  const { title, description } = req.body;
  const feedback = await Feedback.create({
    title,
    description,
  });
  if (feedback) {
    res.status(201).json({
      _id: feedback._id,
      title: feedback.title,
      description: feedback.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid return data");
  }
});
app.get("/api/feedback", async (req, res) => {
  const feedback = await Feedback.find();
  if (feedback) {
    res.status(200).json(feedback);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});




app.get("/api/config/paypal", (req, res) => res.send("asdasdad"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);


app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);
