import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: { type: Boolean, default: true }, // Tmb puede ir en el controlador
});

const role = mongoose.model("roles", roleSchema);

export default role;
