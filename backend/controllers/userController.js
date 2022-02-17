import bcrypt from "bcrypt"; // encriptación
import jwt from "jsonwebtoken";
import moment from "moment"; // fechas

import user from "../models/user.js";
import role from "../models/role.js";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user.find().populate("role").exec();

  if (users.length === 0)
    return res.status(404).send({ message: "No search results" });

  return res.status(200).send({ users });
};

export default { registerUser, listUser };
