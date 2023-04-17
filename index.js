// -------------------------------------------- IMPORTS
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config/dotenv.js";

// -------------------------------------------- CONST
const PORT = process.env.PORT;
const app = express();

// -------------------------------------------- MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// -------------------------------------------- SERVER LISTEN ON PORT
app.listen(PORT, () => {
  console.log("Server listen on port:", PORT);
});
