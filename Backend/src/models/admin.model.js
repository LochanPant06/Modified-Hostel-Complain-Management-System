// models/admin.model.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    officialEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);


// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  // next();
});
// Compare password during login
adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// ----------------------generateAccessToken-------------------------
adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            officialEmail: this.officialEmail,
            fullName: this.fullName,
            employeeId: this.employeeId,
            role: "admin"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};
// ----------------------generateRefreshToken-------------------------
adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: "admin"
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;