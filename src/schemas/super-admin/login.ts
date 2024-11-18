import mongoose from "mongoose";

export const superAdminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const superAdminLogin = mongoose.model(
  "SuperAdmin",
  superAdminLoginSchema,
);
