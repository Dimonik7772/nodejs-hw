import { model, Schema } from "mongoose";
import { emailRegex } from "../constants/emailRegex.js";

const userSchema = new Schema(
  {
    usename: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
userSchema.pre(
  "save",
  function () {
    if (!this.username) {
      this.username = this.email;
    }
  },
  { versionKey: false },
);

userSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model("User", userSchema);
