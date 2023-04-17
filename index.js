// -------------------------------------------- IMPORTS
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config/dotenv.js";
import { addBoat, getBoats, deleteBoat, editBoat } from "./dbfunctions/boats.js";

// -------------------------------------------- CONST
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;
const app = express();

// -------------------------------------------- MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// -------------------------------------------- GET ROUTES
app.get(API_VERSION + "getBoats", getBoats);

// -------------------------------------------- POST ROUTE
app.post(API_VERSION + "addBoat", addBoat);

// -------------------------------------------- DELETE ROUTE
app.delete(API_VERSION + "deleteBoat", deleteBoat);

// -------------------------------------------- EDIT ROUTE
app.put(API_VERSION + "editBoat", editBoat);

// -------------------------------------------- SERVER LISTEN ON PORT
app.listen(PORT, () => {
  console.log("Server listen on port:", PORT);
});
