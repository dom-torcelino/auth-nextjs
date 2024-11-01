import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // name: {
    //     type: String,
    //     required: true,
    // },
    lastLogin: {
      type: Date,
      dafault: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    loginOtp: String,
    verificationTokenExpiresAt: Date,
    loginOtpExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
