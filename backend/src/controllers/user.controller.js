import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import ActivityLog from "../models/ActivityLog.model.js";





// it is same as admin just role = users here and no self chekc is implemented as users are managed by admin 



export const getUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};


export const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    role: "user",
  });

  const performer = await User.findById(req.user.userId);

  await ActivityLog.create({
    action: "CREATE_USER",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: user._id,
    targetUsername: user.username,
    targetRole: user.role,
  });

  res.status(201).json({ message: "User created" });
};


export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user.role !== "user") {
    return res.status(404).json({ message: "User not found" });
  }

  const { username, password } = req.body;

  if (username) user.username = username;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  const performer = await User.findById(req.user.userId);

  await ActivityLog.create({
    action: "UPDATE_USER",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: user._id,
    targetUsername: user.username,
    targetRole: user.role,
  });

  res.json({ message: "User updated" });
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user.role !== "user") {
    return res.status(404).json({ message: "User not found" });
  }

  const performer = await User.findById(req.user.userId);
  const targetUsername = user.username;
  const targetRole = user.role;

  await user.deleteOne();

  await ActivityLog.create({
    action: "DELETE_USER",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: id,
    targetUsername: targetUsername,
    targetRole: targetRole,
  });

  res.json({ message: "User deleted" });
};
