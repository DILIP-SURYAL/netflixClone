import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import databaseConnection from "./utils/database.js";
import router from "./routes/userRoute.js";
dotenv.config({
  path: ".env",
});

databaseConnection();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/user", router);
app.get("/", (req, res) => {
  res.send("API is working 🎉");
});

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server:", error);
  // Exit the process with a failure code
}
