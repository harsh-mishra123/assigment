import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { env } from "../config/env.js";

export const seedInitialAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("Admin already exists");
    return;
  }

  if (!env.INIT_ADMIN_USERNAME || !env.INIT_ADMIN_PASSWORD) {
    throw new Error("Initial admin credentials missing");
  }

  const hashedPassword = await bcrypt.hash(env.INIT_ADMIN_PASSWORD, 10);

  await User.create({
    username: env.INIT_ADMIN_USERNAME,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Initial admin created");
};
