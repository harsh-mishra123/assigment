import bcrypt from "bcrypt";
import ActivityLog from "../models/ActivityLog.model.js";
import User from "../models/User.model.js";



export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" }).select("-password");

  res.json(admins);

}



export const createAdmin = async (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "Already exists" });

  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    username,
    password: hashedPassword,
    role: "admin"
  });

  const performer = await User.findById(req.user.userId);

  await ActivityLog.create({
    action: "CREATE_ADMIN",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: admin._id,
    targetUsername: admin.username,
    targetRole: admin.role,
  });

  res.status(201).json({ message: "Admin created" });
};



export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userId) {
    return res.status(403).json({ message: "Cannot update self" });
  }


  const admin = await User.findById(id);

  if (!admin || admin.role !== "admin") {
    return res.status(404).json({ message: "Admin not found" });
  }

  const { username, password } = req.body;

  if (username) admin.username = username;
  if (password) admin.password = await bcrypt.hash(password, 10);

  await admin.save();

  const performer = await User.findById(req.user.userId);

  await ActivityLog.create({
    action: "UPDATE_ADMIN",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: admin._id,
    targetUsername: admin.username,
    targetRole: admin.role,
  });

  res.json({ message: "Admin updated" });
};






export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (id === req.user.userId) {
    return res.status(403).json({ message: "Cannot delete yourself" });
  }

  const admin = await User.findById(id);
  if (!admin || admin.role !== "admin") {
    return res.status(404).json({ message: "Admin not found" });
  }

  const performer = await User.findById(req.user.userId);
  const targetUsername = admin.username;
  const targetRole = admin.role;

  await admin.deleteOne();

  await ActivityLog.create({
    action: "DELETE_ADMIN",
    performedBy: req.user.userId,
    performedByUsername: performer.username,
    performedByRole: performer.role,
    targetUser: id,
    targetUsername: targetUsername,
    targetRole: targetRole,
  });

  res.json({ message: "Admin deleted" });
};




