import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

router.post("/registerRole", roleController.registerRole);
router.get("/listRole", roleController.listRole);

export default router;
