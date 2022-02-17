import express from "express";

import userController from "../controllers/userController.js";

import userMidd from "../middleware/userValidate.js";
import roleMidd from "../middleware/roleValidate.js";

const router = express.Router();

router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userController.registerUser
);

router.get("/listUser", userController.listUser);

export default router;
