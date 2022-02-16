import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Lee el archivo .env
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Backend server running on port: ", process.env.PORT);
});

db.dbConnection();
