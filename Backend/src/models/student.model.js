// models/student.model.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    hostelName: {
      type: String,
      required: true,
      trim: true,
    },

    roomNo: {
      type: String,
      required: true,
      trim: true,
    },

    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required']
    },
    refreshToken: {
    type: String
}
  },
  {
    timestamps: true,
  }
);

// ----------------------Hash password before saving -------------------------

studentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// ----------------------Compare password during login-------------------------
studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ----------------------generateAccessToken-------------------------
studentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            collegeEmail: this.collegeEmail,
            fullName: this.fullName,
            rollNo: this.rollNo,
            role: "student"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};
// ----------------------generateRefreshToken-------------------------
studentSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: "student"
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

const Student = mongoose.model("Student", studentSchema);


export default Student;