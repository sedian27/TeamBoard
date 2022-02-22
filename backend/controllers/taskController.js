import model from "../models/task.js";

const registerTask = async (req, res) => {
  const schema = new model({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  const result = await schema.save();

  return !result
    ? res.status(500).send({ message: "Failed to register task" })
    : res.status(200).send({ result });
};

const listTask = async (req, res) => {
  if (!req.params["user"])
    return res.status(400).send({ message: "Incomplete Data" });
  const tasks = await model.find({ user: req.params["user"] });

  if (!tasks) return res.status(500).send({ message: "Failed to find tasks" });

  return tasks.length > 0
    ? res.status(200).send({ tasks })
    : res.status(404).send({ message: "Task not found" });
};

const listTaskAdmin = async (req, res) => {
  const tasks = await model
    .find({
      $or: [
        { name: new RegExp(req.params["search"]) },
        { description: new RegExp(req.params["search"]) },
      ],
    })
    .populate("user")
    .exec();
  return tasks.length > 0
    ? res.status(200).send({ tasks })
    : res.status(404).send({ message: "Task not found" });
};

const changeTaskStatus = async (req, res) => {
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  if (
    req.body.taskStatus != "to-do" &&
    req.body.taskStatus != "in-progress" &&
    req.body.taskStatus != "finish"
  )
    return res.status(400).send({ message: "Invalid data" });

  const statusChanged = await model.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });

  return !statusChanged
    ? res.status(500).send({ message: "Failed to change task status" })
    : res.status(200).send({ message: "Task status changed" });
};

const deleteTask = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const deleted = await model.findByIdAndDelete(req.params["_id"]);
  return !deleted
    ? res.status(500).send({ message: "Failed to delete task" })
    : res.status(200).send({ message: "Task deleted successfully" });
};

export default {
  registerTask,
  listTask,
  listTaskAdmin,
  changeTaskStatus,
  deleteTask,
};
