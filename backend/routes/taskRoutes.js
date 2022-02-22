import express from "express";
import controller from "../controllers/taskController.js";

const router = express.Router();

router.post("/registerTask", controller.registerTask);
router.get("/listTaskUser/:user", controller.listTask);
router.get("/listTask/:search?", controller.listTaskAdmin);
router.put("/updateTask", controller.changeTaskStatus);
router.delete("/deleteTask/:_id", controller.deleteTask);

export default router;
