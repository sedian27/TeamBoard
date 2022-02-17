import express from "express";
import userController from "../controllers/userController.js";
import uMidd from "../middleware/userValidate.js";
import rMidd from "../middleware/roleValidate.js";

const router = express.Router();

router.post(
  "/registerUser",
  uMidd.existingUser,
  rMidd.existingRole,
  userController.registerUser
);

export default router;
