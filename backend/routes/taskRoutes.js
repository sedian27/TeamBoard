import express from "express";
import controller from "../controllers/taskController.js";

const router = express.Router();

router.post("/registerTask", controller.registerTask);
router.get("/listTaskUser/:_id", controller.listTask);
router.get("/listTask", controller.listTaskAdmin);
router.put("/updateTask", controller.updateTask);
router.delete("/deleteTask", controller.deleteTask);

export default router;
